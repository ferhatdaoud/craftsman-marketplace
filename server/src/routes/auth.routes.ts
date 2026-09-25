import { Router } from "express";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { registerUser, loginUser } from "../services/auth.service.js";
export const authRouter = Router();
authRouter.post("/register", async (req, res) => {
  const data = req.body;

  try {
    const validatedData = registerSchema.parse(data);

    const newUser = await registerUser(validatedData);

    res.status(201).json({
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const data = req.body;
  try {
    const validateData = loginSchema.parse(data);
    const { sessionId, user } = await loginUser(validateData);

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: 'loginSuccessful',
      user: user,
    });
  } catch (error: any) {
    res.status(401).json({
      error: error.message,
    });
  }
});
