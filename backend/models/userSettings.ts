export type Role = "admin" | "user"

export interface UserSettings {
    id: string,
    role: Role,
    userId: string,
    profilePicUrl: string,
    profileColor: string,
    fontSize: number,
    font: string
}