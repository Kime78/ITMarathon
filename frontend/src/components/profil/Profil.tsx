import { useEffect, useState } from "react";

export default function Profile() {
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

  if (!user) return <p>Nu ești autentificat.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profilul meu</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Rol:</strong> {user.user_metadata?.role || "Nespecificat"}
      </p>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Confirmat la:</strong> {user.confirmed_at}
      </p>
    </div>
  );
}
