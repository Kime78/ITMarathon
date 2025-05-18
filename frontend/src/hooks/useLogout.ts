export function useLogout() {
  const logout = () => {
    localStorage.removeItem("user"); // șterge user-ul
    // orice alt cleanup: token, preferințe, etc.
    window.location.href = "/login";
  };

  return logout;
}
