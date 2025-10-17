import { Router } from "express";
import { createSale, cancelSale, getSales } from "../controllers/sales.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// 🔹 Crear venta
router.post("/", authenticate, createSale);

// 🔹 Obtener lista de ventas
router.get("/", authenticate, getSales);

// 🔹 Anular venta
router.post("/:id/cancel", authenticate, cancelSale);



export default router;
