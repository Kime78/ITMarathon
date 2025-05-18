// Interfață pentru tipul de date al utilizatorilor
interface Utilizator {
  id: number;
  nume: string;
  email: string;
  status: "activ" | "blocat" | "inactiv";
  data_inregistrare: string;
}
