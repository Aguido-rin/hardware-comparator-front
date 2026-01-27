export interface Product {
  id: number;
  categoryName: string;
  modelName: string;
  brand: string;
  techSpecs: Record<string, any>;
  imageUrl: string;
  bestPrice: number | null;
}

export interface StoreListing {
  listingId: number;
  storeName: string;
  storeLogoUrl: string;
  price: number;
  buyLink: string;
  inStock: boolean;
  lastUpdate: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
}
