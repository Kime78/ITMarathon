import { Message } from "../models/message";

export interface MessageRepository {
    create(message: Message): Promise<Message>
}