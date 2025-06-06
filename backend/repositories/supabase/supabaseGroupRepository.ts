import { User } from "@supabase/supabase-js";
import { supabase } from "../../config/config";
import { Group } from "../../models/group";
import { Message } from "../../models/message";
import { GroupRepository } from "../groupRepository";

export class SupabaseGroupRepository implements GroupRepository {
    async getUserGroups(userId: string): Promise<Group[]> {
        const { data, error } = await supabase
            .from("group_users")
            .select("group(*)")
            .eq("user_id", userId)

        console.log(error)
        if (error)
            throw new Error(`Failed to fetch: ${error}`)

        return data as unknown as Group[]

    }

    async getGroupDetails(groupId: string): Promise<Group> {
        const { data, error } = await supabase
            .from("group")
            .select()
            .eq("id", groupId)
            .single()

        if (error)
            throw new Error(`Failed to fetch: ${error}`)

        return {
            id: data.id,
            userIds: [],
            name: data.name,
            groupPictureUrl: data.group_picture_url,
            messages: []
        }
    }

    async create(group: Omit<Group, "id" | "messages" | "userIds">): Promise<Group> {
        const { data, error } = await supabase.from("group").insert(group).select().single()
        if (error) {
            console.log(error)
            throw error;
        }

        return {
            id: data.id,
            name: data.name,
            groupPictureUrl: data.group_picture_url,
            userIds: [],
            messages: []
        }
    }

    async addMessage(groupId: string, messageId: string): Promise<void> {
        await supabase
            .from("group_messages")
            .insert({
                group_id: groupId,
                message_id: messageId
            });
    }

    async addUser(groupId: string, userId: string): Promise<void> {
        await supabase
            .from("group_users")
            .insert({
                group_id: groupId,
                user_id: userId
            })
    }

    async removeUser(groupId: string, userId: string): Promise<void> {
        await supabase
            .from("group_users")
            .delete()
            .eq("group_id", groupId)
            .eq("user_id", userId)
    }

    async getAllMessages(groupId: string): Promise<Message[]> {
        const { data, error } = await supabase
            .from("group_messages")
            .select("messages(*)")
            .eq("group_id", groupId)


        console.log(error)
        if (error)
            throw new Error(`Failed to fetch: ${error}`)

        return data as unknown as Message[]

    }

    async getAllUsers(groupId: string): Promise<User[]> {
        const { data, error } = await supabase
            .from("group_users")
            .select("users(*)")
            .eq("group_id", groupId)


        if (error)
            throw new Error(`Failed to fetch: ${error}`)


        return data as unknown as User[]
    }


    async getMessagesFromUser(groupId: string, userId: string): Promise<Message[]> {
        const { data, error } = await supabase
            .from("group_messages")
            .select("messages(*)")
            .eq("group_id", groupId)
            .eq("messages.sender_id", userId)


        if (error || !data) {
            throw new Error(`Failed to fetch messages: ${error?.message}`);
        }
        return data as unknown as Message[]
        // return data.map((entry) => entry.messages as Message[]);
    }

}