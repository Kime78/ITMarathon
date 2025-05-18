export function useUser() {
  if (typeof window === "undefined")
    return { role: "guest", name: "Vizitator" };
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : { role: "guest", name: "Vizitator" };
}
