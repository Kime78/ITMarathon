import { supabase } from "../../config/config";
import { UserSettings } from "../../models/userSettings";
import { UserSettingsRepository } from "../userSettingsRepository";

export class SupabaseUserSettingsRepository implements UserSettingsRepository {
    async edit(data: UserSettings): Promise<UserSettings> {
        const { data: updated, error } = await supabase
            .from("user-settings")
            .update({
                role: data.role,
                profilePicUrl: data.profilePicUrl,
                profileColor: data.profileColor,
                fontSize: data.fontSize,
                font: data.font,
            })
            .eq("userId", data.userId)
            .select()
            .single();

        if (error) {
            throw new Error("Failed to update user settings: " + error.message);
        }

        return updated as UserSettings;
    }

    async get(userId: string): Promise<UserSettings> {
        const { data, error } = await supabase
            .from("user-settings")
            .select("*")
            .eq("userId", userId)
            .single();

        if (error) {
            throw new Error("Failed to get user settings: " + error.message);
        }

        return data as UserSettings;
    }

}