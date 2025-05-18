// În ChatApp.tsx
import { useState } from "react";
import ConversationList from "./ConversationList";
import ConversationPanel from "./ConversationPanel";
import Profil from "@/components/profil/Profil";

export default function ChatApp() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  console.log("ID conversație selectată în ChatApp:", selectedConversationId);

  return (
    <div className="flex h-screen">
      {/* Panoul din stânga (Lista de conversații) */}
      <aside className="w-1/4 border-r border-gray-200 overflow-y-auto">
        <ConversationList onGroupSelect={setSelectedConversationId} />
      </aside>

      {/* Panoul central (Conținutul conversației) */}
      <main className="flex-1 overflow-hidden">
        <ConversationPanel selectedConversationId={selectedConversationId} />
      </main>

      {/* Panoul din dreapta (Profil) */}
      <aside className="w-1/4 border-l border-gray-200 overflow-y-auto">
        <Profil />
      </aside>
    </div>
  );
}
