import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  //   const { name, email, password, phone, role } = req.body;
  try {
    const result = await authServices.signup(req.body);
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.login(email, password);
    res.status(201).send({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

export const authControllers = {
  signup,
  login,
};
