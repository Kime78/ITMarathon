import { useState, useEffect } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { ro } from "date-fns/locale";
import type { Message } from "@/models/message";

const conversatiiMock: Group[] = [
  {
    id: 1,
    nume: "Bogdan",
    messages: [
      {
        id: "1",
        senderId: "bogdan",
        imageUrl:
          "https://www.ionos.ro/digitalguide/fileadmin/DigitalGuide/hi/Fotografie-Steganographie.jpg",
        createdAt: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: "2",
        senderId: "me",
        imageUrl:
          "https://www.ionos.ro/digitalguide/fileadmin/DigitalGuide/hi/Imagine2.jpg",
        createdAt: new Date(Date.now() - 1700000).toISOString(),
      },
    ],
  },
];

function ConversationPanel({
  selectedConversationId,
}: {
  selectedConversationId: number | null;
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (selectedConversationId) {
      const conversation = conversatiiMock.find(
        (conv) => conv.id === selectedConversationId
      );
      setMessages(conversation?.messages ?? []);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  const handleSendImage = (imageUrl: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Trimitere către backend
    console.log("Imagine trimisă:", imageUrl);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (isYesterday(date)) {
      return "Ieri";
    } else {
      return format(date, "dd.MM.yyyy", { locale: ro });
    }
  };

  if (!selectedConversationId) {
    return (
      <p className="p-4 text-gray-500">
        Selectează o conversație pentru a o vizualiza.
      </p>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="overflow-y-auto flex-grow">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-md ${
              message.senderId === "me"
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            <img
              src={message.imageUrl}
              alt="Imagine"
              className="max-w-xs h-auto rounded-md"
            />
            <time className="text-xs text-gray-500 block mt-1">
              {formatDate(message.createdAt)}
            </time>
          </div>
        ))}
      </div>

      {/* Trimitere imagine hardcodată pentru demo */}
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() =>
            handleSendImage(
              "https://www.ionos.ro/digitalguide/fileadmin/DigitalGuide/hi/Imagine3.jpg"
            )
          }
        >
          Trimite imagine
        </button>
      </div>
    </div>
  );
}

export default ConversationPanel;
