export interface AuthRequest {
    email: string;
    password: string;
}

export interface BriefRequest {
    name: string;
    content: string;
    statusId: number;
    authorId: number;
}

export interface PromoRequest {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    statusId: number;
    teamIds: Set<number>;
}

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    rawPassword: string;
    genreId: number;
}

export interface StudentRequest {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    genreId: number;
}