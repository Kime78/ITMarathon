import { useState } from "react";

const ResetPasswordConfirm = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setStatus("Parolele nu coincid.");
      return;
    }

    const res = await fetch(
      `http://localhost:3000/api/users/reset-password/confirm?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Setează parolă nouă</h2>
      <input
        type="password"
        placeholder="Parolă nouă"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmare parolă"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />
      <button type="submit">Actualizează parola</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default ResetPasswordConfirm;
