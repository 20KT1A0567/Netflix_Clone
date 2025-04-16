// backend/config/envVars.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current dirname (because you're using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent folder (backend/.env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const ENV_VARS = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "my_really_hard_to_decode_sceret",
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
