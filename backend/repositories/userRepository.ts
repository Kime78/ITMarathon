import { UserSettings } from "../models/userSettings";

export interface UserRepository {
    signUp(email: string, password: string, settings: Partial<UserSettings>): Promise<any>;
    login(email: string, password: string): Promise<any>;
    findById(id: string): Promise<any>;
    updateSettings(userId: string, settings: Partial<UserSettings>): Promise<any>;
    resetPassword(email: string): Promise<void>;
}