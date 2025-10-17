import { Request, Response } from "express";
import Product from "../models/Product";

export const listProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const data = req.body;
  const product = new Product(data);
  await product.save();
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(updated);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).send();
};
