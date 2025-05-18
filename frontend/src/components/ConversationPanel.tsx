import { useState, useEffect } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { ro } from "date-fns/locale";
import type { Message } from "@/models/message";

interface ConversationPanelProps {
  selectedConversationId: string | null;
}

function ConversationPanel({ selectedConversationId }: ConversationPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentGroupName, setCurrentGroupName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (selectedConversationId) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://localhost:3000/api/group/${selectedConversationId}/messsages`
          );
          if (!response.ok) {
            const errorData = await response.json();
            console.error(`Eroare server: ${response.status}`, errorData);
            throw new Error(
              `Eroare server: ${response.status} - ${
                errorData?.message || "Detalii eroare indisponibile"
              }`
            );
          }

          const data: { messages?: Message[]; name?: string } =
            await response.json();
          if (data) {
            // Add this check
            setMessages(data.messages || []);
            setCurrentGroupName(data.name || null);
          } else {
            console.warn(
              "API returned null or undefined data for conversation:",
              selectedConversationId
            );
            setMessages([]);
            setCurrentGroupName(null);
          }
        } catch (err: any) {
          setError(err.message || "Eroare la încărcarea conversației.");
          setMessages([]);
          setCurrentGroupName(null);
        } finally {
          setLoading(false);
        }
      } else {
        setMessages([]);
        setCurrentGroupName(null);
        setLoading(false);
        setError(null);
      }
    };

    fetchConversation();
  }, [selectedConversationId]);
  const handleSendImage = async (imageUrl: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await fetch(
        `http://localhost:3000/api/group/${selectedConversationId}/messages`, // Adjust the API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );
      if (!response.ok) {
        throw new Error(`Eroare la trimiterea imaginii: ${response.status}`);
      }
      // Optionally, update the local state with the server's response
      const serverMessage: Message = await response.json();
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? serverMessage : msg))
      );
    } catch (err: any) {
      setError(err.message || "Eroare la trimiterea imaginii.");
      // Optionally, revert the local state if the send fails
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
    }
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

  if (!selectedConversationId && !loading && !error) {
    return (
      <p className="p-4 text-gray-500">
        Selectează o conversație pentru a o vizualiza.
      </p>
    );
  }

  if (loading) {
    return <p className="p-4 text-gray-500">Se încarcă...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Eroare: {error}</p>;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      {currentGroupName && (
        <div className="border-b py-2 mb-2">
          <h2 className="font-semibold text-lg">{currentGroupName}</h2>
        </div>
      )}
      {messages.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">
            Nu există mesaje în această conversație.
          </p>
        </div>
      ) : (
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
              {message.imageUrl ? (
                <img
                  src={message.imageUrl}
                  alt="Imagine"
                  className="max-w-xs h-auto rounded-md"
                />
              ) : (
                <p className="text-gray-800">{message.text}</p>
              )}
              <time className="text-xs text-gray-500 block mt-1">
                {formatDate(message.createdAt)}
              </time>
            </div>
          ))}
        </div>
      )}

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
