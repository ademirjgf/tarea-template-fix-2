import type { Request, Response } from "express";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
} from "../models/customer.model.js";

export const getCustomers = async (
  req: Request,
  res: Response
) => {
  try {
    const customers = await getAllCustomers();

    res.json(customers);
  } catch (error) {
    console.error("Error al obtener clientes:", error);

    res.status(500).json({
      error: "Error al obtener los clientes",
    });
  }
};

export const getCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const customer = await getCustomerById(id);

    if (!customer) {
      return res.status(404).json({
        error: "Cliente no encontrado",
      });
    }

    res.json(customer);
  } catch (error) {
    console.error("Error al obtener cliente:", error);

    res.status(500).json({
      error: "Error al obtener el cliente",
    });
  }
};
export const createNewCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, phone_number } = req.body;

    const customer = await createCustomer(
      name,
      email,
      phone_number ?? null
    );

    res.status(201).json(customer);
  } catch (error) {
    console.error("Error al crear cliente:", error);

    res.status(500).json({
      error: "Error al crear el cliente",
    });
  }
};

export const updateExistingCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { name, email, phone_number } = req.body;

    const customer = await updateCustomer(
      id,
      name,
      email,
      phone_number ?? null
    );

    if (!customer) {
      return res.status(404).json({
        error: "Cliente no encontrado",
      });
    }

    res.json(customer);
  } catch (error) {
    console.error("Error al actualizar cliente:", error);

    res.status(500).json({
      error: "Error al actualizar el cliente",
    });
  }
};