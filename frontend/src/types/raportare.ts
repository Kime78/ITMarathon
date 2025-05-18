// Interfață pentru tipul de date al raportărilor
interface Raportare {
  id: number;
  utilizator: string;
  continut: string;
  motiv: string;
  data: string;
  status: "pending" | "resolved";
}
