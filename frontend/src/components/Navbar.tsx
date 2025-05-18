import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

type Role = "admin" | "user" | "guest";

const mockUser = {
  name: "Cezar",
  role: "admin" as Role, // sau "user"
};

const routes = {
  home: {
    path: "/",
    label: "Acasă",
    roles: ["user", "admin"],
  },
  conversations: {
    path: "/conversatii",
    label: "Conversații",
    roles: ["user", "admin"],
  },
  profile: {
    path: "/profil",
    label: "Profil",
    roles: ["user", "admin"],
  },
  admin: {
    path: "/admin",
    label: "Admin",
    roles: ["admin"],
  },
  logout: {
    path: "/logout",
    label: "Logout",
    roles: ["user", "admin"],
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const visibleRoutes = Object.values(routes).filter((route) =>
    route.roles.includes(mockUser.role)
  );

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-lg font-bold">StegoApp</div>
        <div className="hidden md:flex space-x-4 items-center">
          {visibleRoutes.map((route) => (
            <a key={route.path} href={route.path}>
              <Button
                variant="ghost"
                className={route.path === "/admin" ? "text-red-600" : ""}
              >
                {route.label}
              </Button>
            </a>
          ))}
          <span className="text-sm text-gray-500">Salut, {mockUser.name}</span>
          <a href={routes.logout.path}>
            <Button variant="ghost">{routes.logout.label}</Button>
          </a>
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white border-t space-y-2 p-2">
          {visibleRoutes.map((route) => (
            <a key={route.path} href={route.path}>
              <Button
                variant="ghost"
                className='w-full  {route.path === "/admin" ? "text-red-600" : ""}'
              >
                {route.label}
              </Button>
            </a>
          ))}
          <a href={routes.logout.path}>
            <Button variant="ghost" className="w-full">
              {routes.logout.label}
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
