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
      daily_rent_price NUMERIC NOT NULL,
      availability_status VARCHAR(20) NOT NULL
    );
  `);
};

export default initDB;
