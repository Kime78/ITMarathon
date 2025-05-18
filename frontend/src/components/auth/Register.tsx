// src/components/RegisterForm.tsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAgreeTermsChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeTerms: checked,
    });

    if (errors.agreeTerms) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.agreeTerms;
        return newErrors;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { name, email, password, confirmPassword, agreeTerms } = formData;

    if (!name.trim()) newErrors.name = "Numele este obligatoriu";
    if (!email.trim()) {
      newErrors.email = "Emailul este obligatoriu";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Introdu o adresă de email validă";
    }

    if (!password) {
      newErrors.password = "Parola este obligatorie";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        password
      )
    ) {
      newErrors.password =
        "Parola trebuie să conțină minim 8 caractere, o majusculă, o minusculă, o cifră și un caracter special";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Parolele nu coincid";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "Trebuie să accepți termenii și condițiile";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateApiCall = async (data: typeof formData) => {
    const payload = {
      email: data.email,
      password: data.password,
      settings: {
        profilePicUrl: "https://example.com/avatar.png",
        profileColor: "#3498db",
        fontSize: 14,
        font: "Arial",
        role: "user",
      },
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Răspuns de la server:", result);
      return result;
    } catch (error) {
      console.error("Eroare la apelul API:", error);
      setErrors({ submit: "A apărut o eroare la înregistrare." });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await simulateApiCall(formData);

      // setSubmitSuccess(true);
      // Aici ai putea redirecționa utilizatorul sau face altceva cu răspunsul
    } catch (error) {
      console.error("Eroare la înregistrare:", error);
      setErrors({
        submit:
          "A apărut o eroare la înregistrare. Te rugăm să încerci din nou.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Creează un cont nou
        </h1>
        <p className="text-gray-600 mt-2">
          Completează formularul pentru a te înregistra
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Înregistrare reușită! Verifică emailul pentru confirmare.
        </div>
      )}

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nume complet</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Adresă de email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Parolă</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
              required
            />
            {errors.password ? (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                Parola trebuie să conțină minim 8 caractere, incluzând cel puțin
                o majusculă, o minusculă, o cifră și un caracter special.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmă parola</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={handleAgreeTermsChange}
              className={`mt-1 h-4 w-4 ${
                errors.agreeTerms
                  ? "border-red-500 text-red-600"
                  : "border-gray-300 text-blue-600"
              }`}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Termenii și Condițiile
                </a>
              </label>
              {errors.agreeTerms && (
                <p className="text-sm text-red-600">{errors.agreeTerms}</p>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Se înregistrează...
            </span>
          ) : (
            "Creează cont"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Ai deja un cont?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Autentifică-te
          </a>
        </p>
      </div>
    </div>
  );
}
