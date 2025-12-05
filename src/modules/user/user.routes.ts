import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/", userControllers.createUser);

router.get("/", userControllers.getUsers);

router.get("/:userId", userControllers.getSingleUser);

router.put("/:userId", userControllers.updateUser);

router.delete("/:userId", userControllers.deleteUser);

export const userRoutes = router;
