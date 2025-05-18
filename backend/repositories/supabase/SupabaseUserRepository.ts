import { supabase } from "../../config/config";
import { UserSettings } from "../../models/userSettings";
import { UserRepository } from "../userRepository";

export class SupabaseUserRepository implements UserRepository {
    async signUp(email: string, password: string, settings: Partial<UserSettings>) {
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            user_metadata: { role: settings.role || "user" },
            email_confirm: true
        });
        if (error) throw error;

        // Insert into UserSettings table
        await supabase.from("user-settings").insert({
            ...settings,
            userId: data.user.id,
            role: settings.role || "user"
        });

        return data.user;
    }

    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.user;
    }

    async findById(id: string) {
        const { data, error } = await supabase.auth.admin.getUserById(id);
        if (error) throw error;
        return data.user;
    }

    async updateSettings(userId: string, settings: Partial<UserSettings>) {
        const { data, error } = await supabase
            .from("user-settings")
            .update(settings)
            .eq("userId", userId)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async resetPassword(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
    }
}