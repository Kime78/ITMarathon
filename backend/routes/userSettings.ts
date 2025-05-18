import { Router } from "express";
import { UserSettingsController } from "../controllers/userSettingsController";
import { SupabaseUserSettingsRepository } from "../repositories/supabase/supabaseUserSettingsRepository";
import { UserSettingsService } from "../services/userSettingsService";

const repo = new SupabaseUserSettingsRepository();
const service = new UserSettingsService(repo);
const controller = new UserSettingsController(service);

const userSettingsRoutes = Router();

userSettingsRoutes.get("/", controller.get);
userSettingsRoutes.put("/", controller.edit);

export default userSettingsRoutes;