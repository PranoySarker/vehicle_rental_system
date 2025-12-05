import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).send({
      success: true,
      message: "Vehicle created successfully",
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

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    res.status(200).send({
      success: true,
      message: "Vehicles retrieved successfully",
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

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(
      req.params.vehicleId as string
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
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

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.updateVehicle(
      req.body,
      req.params.vehicleId as string
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Vehicle updated successfully",
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

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle(
      req.params.vehicleId as string
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Vehicle deleted successfully",
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

export const vehiclesControllers = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
