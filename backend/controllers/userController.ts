import { UserService } from "../services/userService";
import { Request, Response } from "express";

export class UserController {
    constructor(private readonly service: UserService) {}

    signUp = async (req: Request, res: Response) => {
        try {
            const { email, password, settings } = req.body;
            const user = await this.service.signUp(email, password, settings);
            res.status(201).json(user);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.service.login(email, password);
            res.json(user);
        } catch (err: any) {
            res.status(401).json({ error: err.message });
        }
    };

    getUser = async (req: Request, res: Response) => {
        try {
            const user = await this.service.getUser(req.params.id);
            res.json(user);
        } catch (err: any) {
            res.status(404).json({ error: err.message });
        }
    };

    updateSettings = async (req: Request, res: Response) => {
        try {
            const updated = await this.service.updateUserSettings(req.params.userId, req.body);
            res.json(updated);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    };

    resetPassword = async (req: Request, res: Response) => {
        try {
            await this.service.sendPasswordReset(req.body.email);
            res.json({ message: "Password reset email sent." });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    };
}