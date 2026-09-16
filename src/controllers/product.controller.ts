import type { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/product.model.js";

export const getMenu = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      error: "Error al obtener los productos",
    });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({
      error: "Error al obtener el producto",
    });
  }
};
export const createNewProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        error: "El nombre y el precio son obligatorios",
      });
    }

    const product = await createProduct(
      name,
      description ?? null,
      Number(price)
    );

    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({
      error: "Error al crear el producto",
    });
  }
};
export const updateExistingProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { name, description, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        error: "El nombre y el precio son obligatorios",
      });
    }

    const product = await updateProduct(
      id,
      name,
      description ?? null,
      Number(price)
    );

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      error: "Error al actualizar el producto",
    });
  }
};
export const deleteExistingProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const product = await deleteProduct(id);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado correctamente",
      product,
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      error: "Error al eliminar el producto",
    });
  }
};