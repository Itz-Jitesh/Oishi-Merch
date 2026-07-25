import connectDB from "../db/connect.js";
import Product from "../../models/product.js";
import { PRODUCTS } from "../../data/product.js";
export async function seedProducts() {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(PRODUCTS);

    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}  

