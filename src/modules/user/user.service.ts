import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [userId]);
  return result;
};

const updateUser = async (
  name: string,
  email: string,
  phone: string,
  role: string,
  userId: string
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3,
        role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, userId]
  );
  return result;
};

const deleteUser = async (userId: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
  return result;
};

export const userServices = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
