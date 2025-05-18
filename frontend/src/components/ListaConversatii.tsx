import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings, MessageSquare } from "lucide-react";

interface Conversatie {
  id: number;
  nume: string;
  timestamp: string;
  imagineProfil: string | null;
  ultimaImagine: string | null;
}

const conversatiiMock: Conversatie[] = [
  {
    id: 1,
    nume: "Ion Popescu",
    timestamp: "10:30",
    imagineProfil: "/images/user1.jpg",
    ultimaImagine: "/images/mesaj1.jpg",
  },
  {
    id: 2,
    nume: "Grup Familie",
    timestamp: "Ieri",
    imagineProfil: null,
    ultimaImagine: "/images/grup1.jpg",
  },
  {
    id: 3,
    nume: "Ana Maria",
    timestamp: "15:00",
    imagineProfil: "/images/user2.jpg",
    ultimaImagine: "/images/mesaj2.jpg",
  },
];

export default function ListaConversatii() {
  return (
    <div className="flex flex-col h-full">
      {/* Bara de căutare și butoane acțiuni */}
      <div className="p-2 border-b border-gray-200 flex-shrink-0">
        <Input placeholder="Caută" className="mb-2 w-full text-sm" />
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="icon" className="p-1">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="p-1">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="p-1">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="p-1">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lista de conversații */}
      <div className="overflow-y-auto">
        {conversatiiMock.map((conversatie) => (
          <a
            key={conversatie.id}
            href={`/conversatie/${conversatie.id}`}
            className="block py-2 px-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center"
          >
            <Avatar className="mr-2 flex-shrink-0">
              {conversatie.imagineProfil ? (
                <AvatarImage
                  src={conversatie.imagineProfil}
                  alt={conversatie.nume}
                  className="object-cover" // Asigură-te că imaginea acoperă avatarul
                />
              ) : (
                <AvatarFallback>{conversatie.nume.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800 truncate">
                {conversatie.nume}
              </p>
              {conversatie.ultimaImagine && (
                <div className="ml-2 flex-shrink-0">
                  <img
                    src={conversatie.ultimaImagine}
                    alt="Ultima imagine"
                    className="h-12 w-12 object-cover rounded" // Dimensiuni relative
                  />
                </div>
              )}
              <div className="text-xs text-gray-500 ml-2 flex-shrink-0">
                {conversatie.timestamp}
              </div>
            </div>
          </a>
        ))}
        {conversatiiMock.length === 0 && (
          <p className="p-3 text-center text-gray-500">
            Nicio conversație recentă.
          </p>
        )}
      </div>
    </div>
  );
}
