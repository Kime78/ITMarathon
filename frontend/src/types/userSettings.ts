export type Role = "admin" | "user";

export interface UserSettings {
  id: string; //  Or userId, in functie de cum e definit in BD
  role: Role;
  userId: string;
  profilePicUrl: string;
  profileColor: string;
  fontSize: number;
  font: string;
}
