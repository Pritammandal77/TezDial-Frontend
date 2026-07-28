export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Business {
  _id: string;
  title: string;
  category: string;
  city: string;
  phone: string;
  whatsapp?: string;
  description: string;
  address: string;
  imageBusiness1: string;
  imageBusiness2: string;
  rating: number;
  createdAt: string;
}

export interface BusinessListResponse {
  statusCode: number;
  count: number;
  businesses: Business[];
  message?: string;
}
