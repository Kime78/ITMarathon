import { useEffect, useState } from "react";
import type { Group } from "@/models/group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

interface Props {
  onGroupSelect?: (group: Group) => void;
}

export default function ConversationList({ onGroupSelect }: Props) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const localUser = localStorage.getItem("user");
        if (!localUser) throw new Error("Nu ești autentificat.");
        const user = JSON.parse(localUser);
        const userId = user.id;

        const response = await fetch(
          `http://localhost:3000/api/group/${userId}`
        );
        if (!response.ok) throw new Error(`Eroare server: ${response.status}`);

        const data: Group[] = await response.json();
        setGroups(data);
      } catch (err: any) {
        setError(err.message || "Eroare la încărcarea grupurilor.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
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
      <div className="overflow-y-auto">
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
                  {group.messages[group.messages.length - 1].text}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
