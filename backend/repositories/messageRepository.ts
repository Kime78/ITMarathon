import { Message } from "../models/message";

export interface MessageRepository {
    save(message: Omit<Message, 'id' | 'createdAt'>): Promise<Message>
}