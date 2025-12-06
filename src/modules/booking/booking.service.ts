import { pool } from "../../config/db";

const createBooking = async (
  customer_id: number,
  vehicle_id: number,
  rent_start_date: string,
  rent_end_date: string
) => {
  const userRes = await pool.query(`SELECT id, role FROM users WHERE id=$1`, [
    customer_id,
  ]);

  if (userRes.rows.length === 0) {
    return { error: true, message: "User not found" };
  }

  const user = userRes.rows[0];

  if (user.role !== "customer") {
    return { error: true, message: "You are not allowed to book a vehicle" };
  }

  const vehicleRes = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicle_id,
  ]);

  if (vehicleRes.rows.length === 0) {
    return { error: true, message: "Vehicle not found" };
  }

  const vehicle = vehicleRes.rows[0];

  if (vehicle.availability_status !== "available") {
    return { error: true, message: "Vehicle is not available" };
  }

  const start_date = new Date(rent_start_date);
  const end_date = new Date(rent_end_date);

  if (isNaN(start_date.getTime()) || isNaN(end_date.getTime())) {
    return { error: true, message: "Invalid date format" };
  }

  if (end_date <= start_date) {
    return {
      error: true,
      message: "End date must be greater than start date",
    };
  }

  const number_of_days = Math.ceil(
    (end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24)
  );

  const total_price = number_of_days * Number(vehicle.daily_rent_price);

  const resultRes = await pool.query(
    `INSERT INTO bookings 
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
     VALUES ($1, $2, $3, $4, $5, 'active') 
     RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  const result = resultRes.rows[0];

  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return {
    error: false,
    data: {
      ...result,
      vehicle: {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price,
      },
    },
  };
};

// const getAllBookings = async() =>{

//   try{
//     const resultRes = await pool.query(`SELECT * FROM bookings`);
//     if(userRole === "customer"){
//       return { data: resultRes.rows };
//     }
//     else{
//         return {
//             data: resultRes.rows,

//         }
//     }
// }
// }

export const bookingServices = {
  createBooking,
};
