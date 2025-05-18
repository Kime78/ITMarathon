import { Router } from "express";
import { SupabaseGroupRepository } from "../repositories/supabase/supabaseGroupRepository";
import { GroupService } from "../services/groupService";
import { GroupController } from "../controllers/groupController";

const repo = new SupabaseGroupRepository();
const service = new GroupService(repo);
const controller = new GroupController(service);

const groupRoutes = Router();

groupRoutes.get("/messsages", controller.getAllMessages);
groupRoutes.get("/users", controller.getAllUsers);
groupRoutes.get("/messages/:user_id", controller.getMessagesFromUser);
groupRoutes.post("/messages/:message_id", controller.addMessage);
groupRoutes.post("/users", controller.addUser);
groupRoutes.post("/", controller.create);
groupRoutes.delete("/users/:user_id", controller.removeUser)


export default groupRoutes;