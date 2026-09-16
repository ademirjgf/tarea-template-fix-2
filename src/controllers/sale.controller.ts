import type { Request, Response } from "express";
import {
  getAllSales,
  getSaleById,
  createSale,
} from "../models/sale.model.js";

export const getSales = async (
  req: Request,
  res: Response
) => {
  try {
    const sales = await getAllSales();

    res.json(sales);
  } catch (error) {
    console.error("Error al obtener ventas:", error);

    res.status(500).json({
      error: "Error al obtener las ventas",
    });
  }
};

export const getSale = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const sale = await getSaleById(id);

    if (!sale) {
      return res.status(404).json({
        error: "Venta no encontrada",
      });
    }

    res.json(sale);
  } catch (error) {
    console.error("Error al obtener venta:", error);

    res.status(500).json({
      error: "Error al obtener la venta",
    });
  }
};

export const createNewSale = async (
  req: Request,
  res: Response
) => {
  try {
    const { customer_id, total } = req.body;

    const sale = await createSale(customer_id, total);

    res.status(201).json(sale);
  } catch (error) {
    console.error("Error al crear venta:", error);

    res.status(500).json({
      error: "Error al crear la venta",
    });
  }
};