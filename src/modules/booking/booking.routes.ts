import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("customer", "admin"), bookingControllers.createBooking);

// router.get("/", bookingControllers.getAllBookings);

export const bookingRoutes = router;
