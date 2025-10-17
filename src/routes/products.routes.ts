import { Router } from "express";
import { listProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", listProducts);
router.post("/", authenticate, createProduct); // requiere token
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
