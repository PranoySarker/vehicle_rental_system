import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";

const router = Router();

router.post("/", vehiclesControllers.createVehicle);

router.get("/", vehiclesControllers.getAllVehicles);

router.get("/:vehicleId", vehiclesControllers.getSingleVehicle);

router.put("/:vehicleId", vehiclesControllers.updateVehicle);

router.delete("/:vehicleId", vehiclesControllers.deleteVehicle);

export const vehicleRoutes = router;
