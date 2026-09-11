import axios from "axios";
import "dotenv/config";

const baseURL = process.env.COIN_GECKO_BASE_URL;

if (!baseURL) {
  throw new Error("COIN_GECKO_BASE_URL is required");
}

export const coinApi = axios.create({
  baseURL,
});