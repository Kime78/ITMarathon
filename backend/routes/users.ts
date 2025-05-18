import { Router } from "express";
import { UserController } from "../controllers/userController";
import { SupabaseUserRepository } from "../repositories/supabase/SupabaseUserRepository";
import { UserService } from "../services/userService";

const repo = new SupabaseUserRepository();
const service = new UserService(repo);
const controller = new UserController(service);

const userRoutes = Router();

userRoutes.post("/login", controller.login);
userRoutes.post("/signup", controller.signUp);
userRoutes.get("/:id", controller.getUser);
userRoutes.put("/:userId/settings", controller.updateSettings);
userRoutes.post("/reset-password", controller.resetPassword);


export default userRoutes;