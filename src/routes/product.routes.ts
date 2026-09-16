import { Router } from "express";
import {
createNewProduct,
  getMenu,
  getProduct,
  updateExistingProduct,
  deleteExistingProduct,

} from "../controllers/product.controller.js";

const router: Router = Router();

router.get("/menu", getMenu);
router.get("/menu/:id", getProduct);
router.post("/menu", createNewProduct);
router.put("/menu/:id", updateExistingProduct);
router.delete("/menu/:id", deleteExistingProduct);



export default router;