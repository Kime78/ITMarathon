import { useState, useEffect } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { ro } from "date-fns/locale"; // Import locale pentru limba română

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: Date;
  image?: string | null;
  hasStego: boolean;
}

const conversatiiMock = [
  {
    id: 1,
    nume: "Ion Popescu",
    messages: [
      {
        id: 101,
        sender: "Eu",
        text: "Salut Ion! Ce faci?",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 102,
        sender: "Ion Popescu",
        text: "Salut! Bine, tu?",
        timestamp: new Date(Date.now() - 3540000),
      },
      {
        id: 103,
        sender: "Eu",
        text: "Lucrez la proiectul nou.",
        timestamp: new Date(Date.now() - 3480000),
      },
    ],
  },
  {
    id: 2,
    nume: "Grup Familie",
    messages: [
      {
        id: 201,
        sender: "Mama",
        text: "Nu uitați de sâmbătă!",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: 202,
        sender: "Tata",
        text: "Aduceți și ceva bun de mâncare.",
        timestamp: new Date(Date.now() - 86340000),
      },
      {
        id: 203,
        sender: "Sora",
        text: "Vin cu plăcere!",
        timestamp: new Date(Date.now() - 86280000),
      },
    ],
  },
  {
    id: 3,
    nume: "Ana Maria",
    messages: [
      {
        id: 301,
        sender: "Ana Maria",
        text: "Bună! Ai văzut filmul nou?",
        timestamp: new Date(Date.now() - 10800000),
      },
      {
        id: 302,
        sender: "Eu",
        text: "Încă nu, merită?",
        timestamp: new Date(Date.now() - 10740000),
      },
    ],
  },
  {
    id: 4,
    nume: "Proiect Echipa",
    messages: [
      {
        id: 401,
        sender: "Șeful",
        text: "Termenul limită se apropie!",
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: 402,
        sender: "Colegul 1",
        text: "Lucrez la partea mea.",
        timestamp: new Date(Date.now() - 172740000),
      },
      {
        id: 403,
        sender: "Eu",
        text: "Am terminat task-ul meu.",
        timestamp: new Date(Date.now() - 172680000),
      },
    ],
  },
  {
    id: 5,
    nume: "Bogdan",
    messages: [
      {
        id: 501,
        sender: "Bogdan",
        image:
          "https://www.ionos.ro/digitalguide/fileadmin/DigitalGuide/hi/Fotografie-Steganographie.jpg",
        hasStego: true,
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: 502,
        sender: "Eu",
        text: "Am primit imaginea.",
        timestamp: new Date(Date.now() - 1740000),
      },
    ],
  },
];

interface Conversation {
  id: number;
  nume: string;
  messages: Message[];
}

function ConversationPanel({
  selectedConversationId,
}: {
  selectedConversationId: number | null;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedConversationId) {
      const conversation = conversatiiMock.find(
        (conv) => conv.id === selectedConversationId
      );
      if (conversation) {
        setMessages(conversation.messages);
      } else {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObject: Message = {
        id: Date.now(),
        sender: "Eu",
        text: newMessage,
        timestamp: new Date(),
        hasStego: false,
      };

      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
      setNewMessage("");

      // Aici ar trebui să trimiți mesajul către backend
      console.log("Mesaj trimis:", newMessage);
    }
  };

  const formatDate = (date: Date): string => {
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
              message.sender === "Eu"
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            <p className="text-sm font-semibold">
              {message.sender === "Eu" ? "Tu" : message.sender}
            </p>
            {message.text && <p className="text-gray-800">{message.text}</p>}
            {message.image && (
              <div className="mt-1">
                <img
                  src={message.image}
                  alt="Imagine mesaj"
                  className="max-w-xs h-auto rounded-md"
                />
                {message.hasStego && (
                  <span className="text-xs text-gray-500 italic">
                    Conține mesaj ascuns
                  </span>
                )}
              </div>
            )}
            <time className="text-xs text-gray-500 self-end">
              {formatDate(message.timestamp)}
            </time>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
        <textarea
          placeholder="Scrie un mesaj..."
          className="flex-grow p-2 border rounded-md mr-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSendMessage}
        >
          Trimite
        </button>
        {/* ... Elemente pentru adăugat imagini, etc. ... */}
      </div>
    </div>
  );
}

export default ConversationPanel;
