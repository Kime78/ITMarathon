import React, { useState, useEffect, useRef } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { ro } from "date-fns/locale";
import type { Message } from "@/models/message";

interface ConversationPanelProps {
  selectedConversationId: string | null;
}

interface ApiResponse {
  messages?: Message[];
  name?: string;
}

function ConversationPanel({ selectedConversationId }: ConversationPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentGroupName, setCurrentGroupName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (selectedConversationId) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://localhost:3000/api/group/${selectedConversationId}/messages`,
            {
              method: "GET",
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            console.error(`Eroare server: ${response.status}`, errorData);
            throw new Error(
              `Eroare server: ${response.status} - ${errorData?.message || "Detalii eroare indisponibile"
              }`
            );
          }

          const data = await response.json();
          console.log("Data primită de la API:", data);
          const data2 = data.map((d: any) => d.messages);
          console.log(data2);
          if (data) {
            // Asigură-te că data.messages este un array înainte de a-l seta
            setMessages(Array.isArray(data2) ? data2 : []);
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

  const handleSendImage = async () => {
    if (!fileInputRef.current?.files || fileInputRef.current.files.length === 0) {
      setError("Vă rugăm să selectați o imagine.");
      return;
    }

    const file = fileInputRef.current.files[0];
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("Fișierul este prea mare. Limita este de 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (!e.target) {
        setError("Eroare la citirea fișierului.");
        return;
      }
      const imageUrl = e.target.result as string;

      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "me",
        imageUrl,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);

      try {
        const x = localStorage.getItem("user")!;
        const y = JSON.parse(x);
        const a: string = y.id;

        // Send the image data to your /api/messages endpoint
        const formData = new FormData();
        formData.append('image', file); // 'image' is the field name your API expects
        formData.append('senderId', a);
        formData.append('groupId', `${selectedConversationId}`)

        const resp = await fetch(`http://localhost:3000/api/messages`, {
          method: 'POST',
          body: formData,
        });

        if (!resp.ok) {
          const errorData = await resp.json();
          throw new Error(`Failed to send image: ${resp.status} - ${errorData.message || 'No details available'}`);
        }

        const serverMessage = await resp.json();

        const r2 = await fetch(`http://localhost:3000/api/group/${selectedConversationId}/messages/${serverMessage.id}`, {
          method: "POST"
        })


        // const response = await fetch(
        //   `http://localhost:3000/api/group/${selectedConversationId}/messages`, // Adjust the API endpoint
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(newMessage),
        //   }
        // );
        // if (!response.ok) {
        //   throw new Error(`Eroare la trimiterea imaginii: ${response.status}`);
        // }
        // // Optionally, update the local state with the server's response
        // const serverMessage: Message = await response.json();
        setMessages((prev) =>
          prev.map((msg) => (msg.id === newMessage.id ? serverMessage : msg))
        );
      } catch (err: any) {
        setError(err.message || "Eroare la trimiterea imaginii.");
        // Optionally, revert the local state if the send fails
        setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
      }
    };
    reader.onerror = () => {
      setError("Eroare la citirea fișierului.");
    };
    reader.readAsDataURL(file);
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
              className={`mb-2 p-2 rounded-md ${message.senderId === "me"
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

      {/* Trimitere imagine cu selectare fișier */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleSendImage} // Trigger upload on change
          style={{ display: "none" }}
          ref={fileInputRef}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
          Alege imagine
        </label>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleSendImage}
        // disabled={!selectedFile}
        >
          Trimite imagine
        </button>
      </div>
    </div>
  );
}

export default ConversationPanel;

