import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { email } from "zod";
import crypto from "crypto";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};
type LoginInput = {
  email: string;
  password: string;
};
export async function registerUser(input: RegisterInput) {
  const hashedPassword = await bcrypt.hash(input.password, 12);

  const query = `
  INSERT INTO users(name,email,password_hash)
  VALUES ($1,$2,$3)
  RETURNING id,name,email`;
  const values = [input.name, input.email.toLowerCase(), hashedPassword];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error: any) {
    if (error.code === "23505") {
      throw new Error("email is already registered");
    }
    throw error;
  }
}

export async function loginUser(input: LoginInput) {
  const query = `
SELECT id,name,email,password_hash FROM users WHERE 
email = $1`;
  const values = [input.email.toLowerCase()];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("Invalid email or password");
    }
    const user = result.rows[0];

    const isMatch = await bcrypt.compare(input.password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const sessionId = crypto.randomBytes(32).toString("hex"); // Generates a random 64-character string

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    const sessionQuery = `
    INSERT INTO sessions(id,user_id,expires_at)
    VALUES ($1,$2,$3)`;
    const sessionsValues = [sessionId, user.id, expiresAt];
    await pool.query(sessionQuery, sessionsValues);
    return {
      sessionId,
      user: { id: user.id, name: user.name, email: user.email },
    };
  } catch (err) {
    throw err;
  }
}

export async function getUserFromSession(sessionId: string) {


const query =` 
SELECT `


}

