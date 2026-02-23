import axios from "axios";
import type { Product, StoreListing, PriceHistoryPoint } from "../types/index";

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

  getProductById: async (id: string | number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
};
