import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings } from "lucide-react";

interface Conversatie {
  id: number;
  nume: string;
  imagineProfil: string | null;
  ultimulMesaj: string; // Schimbat din ultimaImagine în ultimulMesaj
  esteGrup: boolean;
  numarMembri?: number;
}

const conversatiiMock: Conversatie[] = [
  {
    id: 1,
    nume: "Ion Popescu",
    imagineProfil: "/images/user1.jpg",
    ultimulMesaj: "Salut! Ce mai faci?",
    esteGrup: false,
  },
  {
    id: 2,
    nume: "Grup Familie",
    imagineProfil: null,
    ultimulMesaj: "Nu uitați de întâlnirea de duminică!",
    esteGrup: true,
    numarMembri: 5,
  },
  {
    id: 3,
    nume: "Ana Maria",
    imagineProfil: "/images/user2.jpg",
    ultimulMesaj: "Am văzut poza, super!",
    esteGrup: false,
  },
  {
    id: 4,
    nume: "Echipa Proiect",
    imagineProfil: null,
    ultimulMesaj: "Termenul limită se apropie!",
    esteGrup: true,
    numarMembri: 10,
  },
  {
    id: 5,
    nume: "Bogdan Ionescu",
    imagineProfil: "/images/user3.jpg",
    ultimulMesaj: "Te sun mai târziu.",
    esteGrup: false,
  },
];

function ConversationList() {
  const [conversations, setConversations] =
    useState<Conversatie[]>(conversatiiMock); // Folosim mock data

  // Nu mai avem nevoie de useEffect și fetch, folosim datele mock direct

  return (
    <div className="w-full h-full">
      <div className="px-4 py-2 flex items-center space-x-4 border-b">
        <Input placeholder="Caută conversații..." className="flex-1" />
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Users className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      <ul className="divide-y divide-gray-200">
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => {
              /* Logica selectare conversație */
              console.log(`Conversație selectată: ${conversation.nume}`);
            }}
            className="flex items-center space-x-4 px-4 py-3 hover:bg-gray-50 cursor-pointer"
          >
            <Avatar>
              {conversation.imagineProfil ? (
                <AvatarImage
                  src={conversation.imagineProfil}
                  alt={conversation.nume}
                />
              ) : (
                <AvatarFallback>{conversation.nume.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {conversation.nume}
                </p>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {conversation.ultimulMesaj}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;
