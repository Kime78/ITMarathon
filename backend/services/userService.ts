import { UserSettings } from "../models/userSettings";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
    constructor(private readonly repo: UserRepository) {}

    signUp(email: string, password: string, settings: Partial<UserSettings>) {
        return this.repo.signUp(email, password, settings);
    }

    login(email: string, password: string) {
        return this.repo.login(email, password);
    }

    getUser(id: string) {
        return this.repo.findById(id);
    }

    updateUserSettings(userId: string, settings: Partial<UserSettings>) {
        return this.repo.updateSettings(userId, settings);
    }

    sendPasswordReset(email: string) {
        return this.repo.resetPassword(email);
    }
}