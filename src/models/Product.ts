import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  sku?: string;
  description?: string;
  price: number;
  category?: string;
  stock: number;
  images?: string[]; // urls
  qrCode?: string; // texto o url
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  sku: { type: String, unique: true, sparse: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 },
  images: [String],
  qrCode: String,
  createdAt: { type: Date, default: Date.now }
});

export default model<IProduct>("Product", productSchema);
