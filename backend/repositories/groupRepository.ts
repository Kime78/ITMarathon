import { User } from "@supabase/supabase-js";
import { Group } from "../models/group";
import { Message } from "../models/message";

export interface GroupRepository {
    create(group: Omit<Group, "id" | "messages" | "userIds">): Promise<Group>
    addMessage(groupId: string, messageId: string): Promise<void>
    addUser(groupId: string, userId: string): Promise<void>
    removeUser(groupId: string, userId: string): Promise<void>
    getAllMessages(groupId: string): Promise<Message[]>
    getMessagesFromUser(groupId: string, userId: string): Promise<Message[]>
    getAllUsers(groupId: string): Promise<User[]>
}