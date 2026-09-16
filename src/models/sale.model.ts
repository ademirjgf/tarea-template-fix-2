import pool from "../config/db.js";

export interface Sale {
  id: number;
  customer_id: number;
  customer_name: string;
  total: number;
  sale_date: Date;
}

export const getAllSales = async (): Promise<Sale[]> => {
  const result = await pool.query(
    `SELECT
       s.id,
       s.customer_id,
       c.name AS customer_name,
       s.total,
       s.sale_date
     FROM sales s
     INNER JOIN customers c ON s.customer_id = c.id
     ORDER BY s.id`
  );

  return result.rows;
};

export const getSaleById = async (
  id: number
): Promise<Sale | null> => {
  const result = await pool.query(
    `SELECT
       s.id,
       s.customer_id,
       c.name AS customer_name,
       s.total,
       s.sale_date
     FROM sales s
     INNER JOIN customers c ON s.customer_id = c.id
     WHERE s.id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
};
export const createSale = async (
  customer_id: number,
  total: number
) => {
  const result = await pool.query(
    `INSERT INTO sales (customer_id, total)
     VALUES ($1, $2)
     RETURNING *`,
    [customer_id, total]
  );

  return result.rows[0];
};