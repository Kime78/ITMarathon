import { Router } from "express";
import { SupabaseGroupRepository } from "../repositories/supabase/supabaseGroupRepository";
import { GroupService } from "../services/groupService";
import { GroupController } from "../controllers/groupController";

const repo = new SupabaseGroupRepository();
const service = new GroupService(repo);
const controller = new GroupController(service);

const groupRoutes = Router();
//**
// * @swagger
// */
groupRoutes.get("/:group_id/messsages/", controller.getAllMessages);
groupRoutes.get("/:group_id/users", controller.getAllUsers);
groupRoutes.get("/:group_id/messages/:user_id", controller.getMessagesFromUser);
groupRoutes.post("/:group_id/messages/:message_id", controller.addMessage);
groupRoutes.post("/:group_id/users/:user_id", controller.addUser);
groupRoutes.post("/", controller.create);
groupRoutes.delete("/:group_id/users/:user_id", controller.removeUser)
groupRoutes.get("/:group_id", controller.getGroupById);
groupRoutes.get("/user/groups/:user_id", controller.getGroupsByUserID);

export default groupRoutes;