import pool from "./db";
import { User } from "../Model/userModel";

export const findByEmail = async (email: string): Promise<User | undefined> => {
  const result = await pool.query<User>("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const create = async (email: string, hashedPassword: string): Promise<User> => {
  const result = await pool.query<User>(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword]
  );
  return result.rows[0];
};