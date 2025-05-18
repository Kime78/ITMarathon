import { useState } from "react";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:3000/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        setMessage("Dacă emailul există, un link de resetare a fost trimis.");
      } else {
        const error = await res.json();
        setMessage("Eroare: " + error.message);
      }
    } catch (err) {
      setMessage("Eroare la comunicare cu serverul.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <label>
        Introdu email-ul pentru resetare parolă:
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "4px",
            marginBottom: "12px",
          }}
        />
      </label>
      <button type="submit" disabled={loading} style={{ padding: "10px 16px" }}>
        {loading ? "Se trimite..." : "Trimite link resetare"}
      </button>
      {message && <p style={{ marginTop: "12px" }}>{message}</p>}
    </form>
  );
}
