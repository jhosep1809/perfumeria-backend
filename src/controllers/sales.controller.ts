import { Request, Response } from "express";
import Sale from "../models/Sale";
import Product from "../models/Product";

export const createSale = async (req: Request, res: Response) => {
  const { items, paymentMethod, customer } = req.body;

  try {
    // Verificar y actualizar stock
    for (const it of items) {
      const product = await Product.findById(it.product);
      if (!product) {
        return res.status(404).json({ message: `Producto ${it.product} no encontrado` });
      }
      if (product.stock < it.qty) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }

      product.stock -= it.qty;
      await product.save();
    }

    const total = items.reduce((acc: number, i: any) => acc + i.price * i.qty, 0);
    const sale = new Sale({ items, total, paymentMethod, customer });
    await sale.save();

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear venta", error });
  }
};

export const cancelSale = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sale = await Sale.findById(id);
    if (!sale) return res.status(404).json({ message: "Venta no encontrada" });
    if (sale.canceled) return res.status(400).json({ message: "Venta ya anulada" });

    // Revertir stock
    for (const it of sale.items) {
      const product = await Product.findById(it.product);
      if (product) {
        product.stock += it.qty;
        await product.save();
      }
    }

    sale.canceled = true;
    await sale.save();

    res.json({ message: "Venta anulada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al anular venta", error });
  }
};
export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find().populate("items.product", "name price");
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
};
