import { UserSettings } from "../models/userSettings";

export interface UserSettingsRepository {
    edit(data: UserSettings): Promise<UserSettings>
    get(userId: string): Promise<UserSettings>
}