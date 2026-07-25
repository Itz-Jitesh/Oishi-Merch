// scripts/seed.js
import "dotenv/config";
import { seedProducts } from "../lib/seed/product.js";

await seedProducts();
process.exit();