import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    res.status(200).send({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(
      req.params.userId as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone, role } = req.body;
  //   const id = req.params.userId;
  try {
    const result = await userServices.updateUser(
      name,
      email,
      phone,
      role,
      req.params.userId as string
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.userId as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "User deleted successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

export const userControllers = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
