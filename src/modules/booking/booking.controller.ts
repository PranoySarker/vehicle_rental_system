import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

  try {
    const result = await bookingServices.createBooking(
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date
    );

    if (result.error) {
      return res.status(400).send({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).send({
      success: true,
      message: "Booking created successfully",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

// const getAllBookings = async (req: Request, res: Response) => {

//   try {
//     const result = await bookingServices.getAllBookings(req.body);
//     res.status(200).send({
//       success: true,
//       message: "Bookings retrieved successfully",
//       data: result.rows,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Something went wrong",
//       error: (error as Error).message,
//     });
//   }
// };

export const bookingControllers = {
  createBooking,
};
