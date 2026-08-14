import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Product from "@/models/product";

// Public typeahead endpoint: fast keyword/name matching for the header
// search dropdown. No embedding computation is performed here.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    await connectDB();

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");

    const products = await Product.find({
      $or: [{ name: regex }, { keywords: regex }],
    })
      .limit(8)
      .select("name slug category images");

    const results = products.map((p) => {
      const result = { name: p.name, slug: p.slug, category: p.category };
      if (p.images && p.images.length > 0) {
        result.image = p.images[0];
      }
      return result;
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search autocomplete error:", error);
    return NextResponse.json(
      { message: "Failed to fetch search suggestions" },
      { status: 500 }
    );
  }
}
