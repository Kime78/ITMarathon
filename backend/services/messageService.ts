import { Message } from "../models/message";
import { MessageRepository } from "../repositories/messageRepository";

export class MessageService {
    constructor(private repo: MessageRepository) { }

    save(message: Omit<Message, "id" | "createdAt">): Promise<Message> {
        return this.repo.save(message)
    }
}