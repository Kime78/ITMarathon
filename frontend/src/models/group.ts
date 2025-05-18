import { Message } from "./message"

export interface Group {
    id: string,
    userIds: string[],
    name: string,
    groupPictureUrl: string
    messages: Message[] 
}