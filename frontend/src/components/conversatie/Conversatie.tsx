import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Camera, Settings } from "lucide-react";

interface Mesaj {
  id: number;
  utilizator: string;
  timestamp: string;
  imagine: string;
}

const mesajeMock: Mesaj[] = [
  {
    id: 1,
    utilizator: "Ion",
    timestamp: "10:30",
    imagine: "/images/mesaj1.jpg",
  },
  {
    id: 2,
    utilizator: "Tu",
    timestamp: "10:35",
    imagine: "/images/mesaj2.jpg",
  },
  {
    id: 3,
    utilizator: "Ion",
    timestamp: "10:40",
    imagine: "/images/mesaj3.jpg",
  },
  // ... mai multe mesaje
];

export default function PaginaConversatie() {
  return (
    <div className="flex flex-col h-full">
      {/* Header-ul conversației */}
      <div className="p-3 border-b border-gray-200 flex items-center flex-shrink-0">
        <Avatar className="mr-3">
          <AvatarImage src="/images/user1.jpg" alt="Ion Popescu" />
          <AvatarFallback>IP</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-bold text-lg">Ion Popescu</h2>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Conținutul conversației */}
      <div className="overflow-y-auto flex-1 p-4">
        {mesajeMock.map((mesaj) => (
          <div
            key={mesaj.id}
            className={`flex ${
              mesaj.utilizator === "Tu" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div className="max-w-xs">
              <div className="text-xs text-gray-500">
                {mesaj.utilizator} - {mesaj.timestamp}
              </div>
              <img src={mesaj.imagine} alt="Mesaj" className="rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer-ul pentru input */}
      <div className="p-3 border-t border-gray-200 flex items-center flex-shrink-0">
        <Button variant="ghost" size="icon">
          <Camera className="h-5 w-5" />
        </Button>
        <Input placeholder="Scrie un mesaj..." className="flex-1 mx-2" />
        <Button variant="ghost" size="icon">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
