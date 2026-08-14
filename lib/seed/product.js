import connectDB from "../db/connect.js";
import Product from "../../models/product.js";
import { PRODUCTS } from "../../data/product.js";
import { getEmbedding } from "../embeddings/nvidia.js";

export async function seedProducts() {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});

    // Generate embeddings sequentially for every product and seed them
    const seededProducts = [];
    for (const product of PRODUCTS) {
      const embeddingText = [
        product.name,
        product.description,
        product.category,
        (product.keywords ?? []).join(" "),
      ]
        .join(" ")
        .trim();

      const embedding = await getEmbedding(embeddingText, "passage");
      seededProducts.push({ ...product, embedding });
    }

    // Insert new products
    await Product.insertMany(seededProducts);

    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}  

