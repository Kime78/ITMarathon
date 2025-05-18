import { useState } from "react";
import ConversationList from "./ConversationList";
import ConversationPanel from "./ConversationPanel";
import Profil from "@/components/profil/Profil";

export default function ChatApp() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  return (
    <div className="grid grid-cols-3 h-screen">
      <aside className="overflow-y-auto border-r border-gray-200">
        <ConversationList onGroupSelect={setSelectedConversationId} />
      </aside>

      <main className="overflow-hidden border-x border-gray-200">
        <ConversationPanel selectedConversationId={selectedConversationId} />
      </main>

      <aside className="overflow-y-auto">
        <Profil />
      </aside>
    </div>
  );
}
