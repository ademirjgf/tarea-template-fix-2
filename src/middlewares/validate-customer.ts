import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().min(1, "El nombre no puede estar vacío"),
  email: z.string().email("El correo electrónico no es válido"),
  phone_number: z
    .string()
    .min(1, "El número de teléfono no puede estar vacío")
    .optional(),
});

export const validateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = customerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  next();
};