import { useState, useEffect } from "react";
import type { Group } from "@/models/group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

interface Props {
  onGroupSelect?: (group: Group) => void;
}

const mockGroups: Group[] = [
  {
    id: "group1",
    userIds: ["user1", "user2", "user3"],
    name: "Echipa Proiect",
    groupPictureUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    messages: [
      {
        id: "msg1",
        senderId: "user1",
        imageUrl: "",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: "msg2",
        senderId: "user2",
        imageUrl:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
    ],
  },
  {
    id: "group2",
    userIds: ["user1", "user4"],
    name: "Familia",
    groupPictureUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    messages: [
      {
        id: "msg3",
        senderId: "user4",
        imageUrl: "",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: "msg4",
        senderId: "user1",
        imageUrl: "",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
      },
    ],
  },
  {
    id: "group3",
    userIds: ["user1", "user5", "user6"],
    name: "Prietenii",
    groupPictureUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    messages: [
      {
        id: "msg5",
        senderId: "user6",
        imageUrl:
          "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=200&q=80",
        createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      },
      {
        id: "msg6",
        senderId: "user1",
        imageUrl: "",
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      },
    ],
  },
];

export default function ConversationList({ onGroupSelect }: Props) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        setGroups(mockGroups);
        setError(null);
      } catch (e) {
        setError("Eroare la încărcarea grupurilor.");
      } finally {
        setLoading(false);
      }
    }, 500);
  }, []);

  return (
    <div className="w-full h-full">
      {/* Bara de căutare și acțiuni */}
      <div className="px-4 py-2 flex items-center space-x-4 border-b">
        <Input placeholder="Caută conversații..." className="flex-1" />
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Users className="h-5 w-5" />
        </Button>
      </div>

      {/* Feedback stare încărcare */}
      {loading && <p className="p-4 text-gray-500">Se încarcă...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}

      {/* Lista de grupuri */}
      <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onGroupSelect?.(group)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
          >
            <img
              src={group.groupPictureUrl}
              alt={group.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{group.name}</p>
              {group.messages?.length > 0 && (
                <p className="text-sm text-gray-500 truncate max-w-[200px]">
                  {group.messages[group.messages.length - 1].imageUrl
                    ? "[Imagine]"
                    : "Mesaj nou"}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
