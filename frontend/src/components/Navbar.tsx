import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

type Role = "admin" | "user" | "guest";

const routes = {
  home: {
    path: "/",
    label: "Conversatii",
    roles: ["user", "admin"],
  },
  admin: {
    path: "/admin",
    label: "Admin",
    roles: ["admin"],
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        setUser(JSON.parse(localUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const role: Role = user?.user_metadata?.role || "guest";

  const visibleRoutes = Object.values(routes).filter((route) =>
    route.roles.includes(role)
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-lg font-bold">StegoApp</div>
        <div className="hidden md:flex space-x-4 items-center">
          {user &&
            visibleRoutes.map((route) => (
              <a key={route.path} href={route.path}>
                <Button
                  variant="ghost"
                  className={route.path === "/admin" ? "text-red-600" : ""}
                >
                  {route.label}
                </Button>
              </a>
            ))}
          {user ? (
            <>
              <a href="/profil">
                <span className="text-sm text-gray-500">
                  {user.user_metadata?.name || user.email}
                </span>
              </a>

              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={handleLogin}>
              Login
            </Button>
          )}
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
          {user &&
            visibleRoutes.map((route) => (
              <a key={route.path} href={route.path}>
                <Button
                  variant="ghost"
                  className={`w-full ${
                    route.path === "/admin" ? "text-red-600" : ""
                  }`}
                >
                  {route.label}
                </Button>
              </a>
            ))}
          <Button
            variant="ghost"
            className="w-full"
            onClick={user ? handleLogout : handleLogin}
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      )}
    </header>
  );
}
