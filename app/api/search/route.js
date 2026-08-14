import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Product from "@/models/product";
import { getEmbedding } from "@/lib/embeddings/nvidia";

const KEYWORD_BONUS = 0.15;

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || a.length !== b.length) {
    return 0;
  }
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) {
    return 0;
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function toResult(p) {
  return {
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    price: p.price,
    images: p.images,
    category: p.category,
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
  };
}

// Public hybrid search endpoint: keyword + semantic (embedding) ranking,
// computed in Node.js at request time. No vector database is used.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();
    const categoryParam = searchParams.get("category") || "";
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort") || "popular";

    const categories = categoryParam
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const filter = {};
    if (categories.length > 0) {
      filter.category = { $in: categories };
    }
    if (maxPrice !== null && maxPrice !== "" && !isNaN(Number(maxPrice))) {
      filter.price = { $lte: Number(maxPrice) };
    }

    await connectDB();

    const products = await Product.find(filter);

    if (!q) {
      let results = products.map(toResult);
      if (sort === "price-asc") {
        results.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        results.sort((a, b) => b.price - a.price);
      }
      return NextResponse.json({ results });
    }

    const queryLower = q.toLowerCase();

    const keywordMatchIds = new Set(
      products
        .filter((p) =>
          [p.name, p.description, ...(p.keywords || [])].some((field) =>
            field && field.toLowerCase().includes(queryLower)
          )
        )
        .map((p) => p._id.toString())
    );

    const queryEmbedding = await getEmbedding(q, "query");

    const scored = products.map((p) => {
      const semanticScore =
        Array.isArray(p.embedding) && p.embedding.length > 0
          ? cosineSimilarity(queryEmbedding, p.embedding)
          : 0;
      const combinedScore =
        semanticScore + (keywordMatchIds.has(p._id.toString()) ? KEYWORD_BONUS : 0);
      return { product: p, combinedScore };
    });

    if (sort === "price-asc") {
      scored.sort((a, b) => a.product.price - b.product.price);
    } else if (sort === "price-desc") {
      scored.sort((a, b) => b.product.price - a.product.price);
    } else {
      scored.sort((a, b) => b.combinedScore - a.combinedScore);
    }

    const results = scored.map((entry) => toResult(entry.product));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
