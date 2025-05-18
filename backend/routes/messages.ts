import { Router } from "express";
import { UserController } from "../controllers/userController";
import { MessageService } from "../services/messageService";
import { SupabaseMessageRepository } from "../repositories/supabase/supabaseMessageRepository";
import { MessageController } from "../controllers/messageController";

const repo = new SupabaseMessageRepository();
const service = new MessageService(repo);
const controller = new MessageController(service);

const messageRoutes = Router();

messageRoutes.post("/", controller.save);

export default messageRoutes;