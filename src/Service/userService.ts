import bcrypt from "bcrypt";
import * as UserRepositorie from "../Repositorie/userRepositorie";
import { User } from "../Model/userModel";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SALT_ROUNDS = 10;

export const registerUser = async (email: string, password: string): Promise<User> => {
  const existingUser = await UserRepositorie.findByEmail(email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return await UserRepositorie.create(email, hashedPassword);
};

const JWT_SECRET = process.env.JWT_SECRET as string;

export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await UserRepositorie.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};