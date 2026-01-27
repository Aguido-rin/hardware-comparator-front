import axios from "axios";
//type es una palabra reservada en TS para importar solo tipos como interfaces
import type { Product, StoreListing, PriceHistoryPoint } from "../types/index";

// Axios en lugar de fetch por simplicidad y manejo de errores
// configuramos el PROXY en vite.config.ts y axios solo pide "/api/..." y el Proxy lo manda al backend.
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/products/search?q=${query}`);
    return response.data;
  },

  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/products/category/${categoryId}`);
    return response.data;
  },

  getListingsByProduct: async (productId: number): Promise<StoreListing[]> => {
    const response = await apiClient.get<StoreListing[]>(`/listings/product/${productId}`);
    return response.data;
  },

  getHistory: async (listingId: number): Promise<PriceHistoryPoint[]> => {
    const response = await apiClient.get<PriceHistoryPoint[]>(`/history/listing/${listingId}`);
    return response.data;
  },
};
