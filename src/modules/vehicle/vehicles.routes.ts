import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehiclesControllers.createVehicle);

router.get("/", vehiclesControllers.getAllVehicles);

router.get("/:vehicleId", vehiclesControllers.getSingleVehicle);

router.put("/:vehicleId", auth("admin"), vehiclesControllers.updateVehicle);

router.delete("/:vehicleId", auth("admin"), vehiclesControllers.deleteVehicle);

export const vehicleRoutes = router;
