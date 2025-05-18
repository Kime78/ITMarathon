import type { Message } from "./message";

export interface Group {
  id: string;
  userIds: string[];
  name: string;
  group_picture_url: string;
  messages: Message[];
}
