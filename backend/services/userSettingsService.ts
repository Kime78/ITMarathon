import { UserSettings } from "../models/userSettings";
import { UserSettingsRepository } from "../repositories/userSettingsRepository";

export class UserSettingsService {
    constructor(private readonly repo: UserSettingsRepository) { }

    edit(settings: UserSettings) {
        return this.repo.edit(settings)
    }

    get(userId: string) {
        return this.repo.get(userId)
    }
}