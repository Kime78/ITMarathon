import { useState } from "react";
import ConversationList from "./ConversationList";
import ConversationPanel from "./ConversationPanel";
import Profil from "@/components/profil/Profil";

export default function ChatApp() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  return (
    <div className="flex h-screen">
      {/* Panoul din stânga (Lista de conversații) */}
      <aside className="w-1/4 border-r border-gray-200 overflow-y-auto">
        <ConversationList onSelectConversation={setSelectedConversationId} />
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
