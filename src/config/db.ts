import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connection_str,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL CHECK (char_length(password) >= 6),
      phone VARCHAR(11),
      role VARCHAR(50) NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(50) NOT NULL,
      type VARCHAR(50) NOT NULL,
      registration_number VARCHAR(50) UNIQUE NOT NULL,
      daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
      availability_status VARCHAR(20) NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
    total_price NUMERIC NOT NULL CHECK (total_price > 0),
    status VARCHAR(20) NOT NULL
    )`);
};

export default initDB;
