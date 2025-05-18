import { Request, Response } from "express";
import { GroupService } from "../services/groupService";

export class GroupController {
    constructor(private readonly service: GroupService) { }

    create = async (req: Request, res: Response) => {
        try {
            const { name, groupPictureUrl } = req.body;

            const group = await this.service.create({
                name,
                groupPictureUrl
            })

            res.status(200).json(group)
        } catch (err: any) {
            res.status(500).json({ error: err.message })
        }
    }

    addMessage = async (req: Request, res: Response) => {
        try {
            const messageId = req.params.message_id;
            const groupId = req.params.group_id;

            await this.service.addMessage(groupId, messageId);

            res.status(201).json("Message added succesfully")
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    addUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.user_id;
            const groupId = req.params.group_id;

            await this.service.addUser(groupId, userId);

            res.status(201).json("User added succesfully")
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    removeUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.user_id;
            const groupId = req.params.group_id;

            await this.service.removeUser(groupId, userId);

            res.status(201).json("User deleted succesfully")
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const groupId = req.params.group_id;

            const users = await this.service.getAllUsers(groupId);

            res.status(201).json(users)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    getAllMessages = async (req: Request, res: Response) => {
        try {
            const groupId = req.params.group_id;

            const messages = await this.service.getAllMessages(groupId);

            res.status(201).json(messages)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    getMessagesFromUser = async (req: Request, res: Response) => {
        try {
            const groupId = req.params.group_id;
            const userId = req.params.user_id;
            const messages = await this.service.getMessagesFromUser(groupId, userId);

            res.status(201).json(messages)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    getGroupById = async (req: Request, res: Response) => {
        try {
            const groupId = req.params.group_id;
            const group = await this.service.getGroupById(groupId);

            res.status(200).json(group)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    getGroupsByUserID = async (req: Request, res: Response) => {
        try {
            const userId = req.params.user_id;
            const groups = await this.service.getGroupsByUserId(userId);

            res.status(200).json(groups)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }
}