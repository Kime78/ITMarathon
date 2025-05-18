import { Router } from "express";
import { UploadPhoto } from "../controllers/uploadPhotoController";
import { SupabaseUploadRepository } from "../repositories/supabase/supabaseUploadRepository"
import { UploadRepository } from "../repositories/uploadRepository"
import { UploadService } from "../services/uploadService";

const repo = new SupabaseUploadRepository();
const service = new UploadService(repo);
const controller = new UploadPhoto(service);

const photoRoutes = Router();


photoRoutes.post("/", controller.upload);

export default photoRoutes;
