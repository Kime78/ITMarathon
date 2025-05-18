import { User } from "@supabase/supabase-js";
import { Group } from "../models/group";
import { Message } from "../models/message";
import { GroupRepository } from "../repositories/groupRepository";

export class GroupService {
    constructor(private repo: GroupRepository) { }

    async create(group: Omit<Group, "id" | "messages" | "userIds">): Promise<Group> {
        return this.repo.create(group);
    }

    addMessage(groupId: string, messageId: string): Promise<void> {
        return this.repo.addMessage(groupId, messageId);
    }

    addUser(groupId: string, userId: string): Promise<void> {
        return this.repo.addUser(groupId, userId);
    }

    removeUser(groupId: string, userId: string): Promise<void> {
        return this.repo.removeUser(groupId, userId);
    }

    getAllMessages(groupId: string): Promise<Message[]> {
        return this.repo.getAllMessages(groupId);
    }

    getMessagesFromUser(groupId: string, userId: string): Promise<Message[]> {
        return this.repo.getMessagesFromUser(groupId, userId);
    }

    getAllUsers(groupId: string): Promise<User[]> {
        return this.repo.getAllUsers(groupId);
    }

    getGroupById(groupId: string): Promise<Group> {
        return this.repo.getGroupDetails(groupId);
    }

    getGroupsByUserId(userId: string): Promise<Group[]> {
        return this.repo.getUserGroups(userId);
    }
}