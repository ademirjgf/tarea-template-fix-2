import { Router } from "express";
import {
  getSales,
  getSale,
  createNewSale,
} from "../controllers/sale.controller.js";

const router: Router = Router();

router.get("/sales", getSales);
router.get("/sales/:id", getSale);
router.post("/sales", createNewSale);

export default router;