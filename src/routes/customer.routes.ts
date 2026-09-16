import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  createNewCustomer,
  updateExistingCustomer,
} from "../controllers/customer.controller.js";
import { validateCustomer } from "../middlewares/validate-customer.js";

const router: Router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", validateCustomer, createNewCustomer);
router.put("/customers/:id", updateExistingCustomer);

export default router;