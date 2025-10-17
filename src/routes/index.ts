import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import productRoutes from "./products.routes";
import salesRoutes from "./sales.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/sales", salesRoutes);

export default router;
