import { Request, Response } from "express";
import { UserSettingsService } from "../services/userSettingsService";

export class UserSettingsController {
    constructor(private readonly service: UserSettingsService) { }

    edit = async (req: Request, res: Response) => {
        try {
            const {
                role,
                userId,
                profilePicUrl,
                profileColor,
                fontSize,
                font } = req.body;
            const user = await this.service.edit({
                role: role,
                userId: userId,
                profilePicUrl: profilePicUrl,
                profileColor: profileColor,
                fontSize: fontSize,
                font: font,
                id: ""
            })

            res.status(200).json(user)
        } catch (err: any) {
            res.status(500).json({ error: err.message })
        }
    }

    get = async (req: Request, res: Response) => {
        try {
            const userId = req.params.user_id;
            const user = await this.service.get(userId);
            res.status(200).json(user)
        }
        catch (err: any) { res.status(500).json({ error: err.message }) }
    }
}