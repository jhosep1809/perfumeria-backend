import { Schema, model, Document, Types } from "mongoose";

interface IItem {
  product: Types.ObjectId;
  name: string;
  qty: number;
  price: number;
}

export interface ISale extends Document {
  items: IItem[];
  total: number;
  paymentMethod: string;
  customer?: { name?: string; document?: string; email?: string };
  createdAt: Date;
  canceled?: boolean;
}

const itemSchema = new Schema<IItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  qty: Number,
  price: Number
});

const saleSchema = new Schema<ISale>({
  items: [itemSchema],
  total: { type: Number, required: true },
  paymentMethod: String,
  customer: Object,
  createdAt: { type: Date, default: Date.now },
  canceled: { type: Boolean, default: false }
});

export default model<ISale>("Sale", saleSchema);
