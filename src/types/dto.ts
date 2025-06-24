export type Role = "USER" | "TEACHER" | "ADMIN";
export type Genre = "female" | "male" | "non binary";
export type Status = "ended" | "ongoing" | "planned";

export interface BriefDTO {
    id: number;
    name: string;
    content: string;
    createdAt: string;
    editedAt: string;
    status: string;
    author: UserDTO;
}

export interface PromoDTO {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    team: UserDTO[];
    students: StudentDTO[];
}

export interface StudentDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    genre: string;
    birthdate: string;
}

export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    genre: Genre;
    roles: Role[];
}