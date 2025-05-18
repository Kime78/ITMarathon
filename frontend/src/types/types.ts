export type Message = {
  sender: string;
  text: string;
  timestamp: Date;
};

export type Conversation = {
  id: string;
  participants: string[];
  image: string;
  messages: Message[];
};
