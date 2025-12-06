import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicles.routes";

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/vehicles", vehicleRoutes);

app.use("/api/v1/bookings", bookingRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
