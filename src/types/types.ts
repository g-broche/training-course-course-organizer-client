export type Role = "user" | "teacher" | "admin" | "student";
export type Degree = "DWWM" | "CDA";
export type Genre = "female" | "male" | "neutral";
export type Status = "ended" | "ongoing" | "planned";

export interface Credentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
    promos: MockPromo[];
    is_verified: boolean;
    has_accepted_terms: boolean;
    has_accepted_cookies: boolean;
    answered_terms_at: number;
    created_at: number;
}

export interface MockUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
    promos: MockPromo[];
    is_verified: boolean;
    has_accepted_terms: boolean;
    has_accepted_cookies: boolean;
    answered_terms_at: number;
    created_at: number;
    created_by: null | number;
    edited_at: null | number;
}

export interface MockPromo {
    id: number,
    name: string,
    description: string,
    degree: {
        id: 2,
        label: Degree
    },
    startDate: string,
    endDate: string,
    createdBy: number,
    createdAt: number,
    editedAt: null,
    status: Status
}

export interface MockSkill {
    id: number,
    promo: number,
    label: string,
    isHardSkill: boolean,
    level: number
}

export interface Student {
    id: number,
    firstName: string;
    lastName: string;
    birthdate: string;
    genre: Genre;
    email: String;
    isVerified: boolean;
    hasAcceptedTerms: boolean;
    hasAcceptedCookies: boolean;
    answeredTermsAt: number;
    createdBy: number;
    createdAt: number;
    editedAt?: null | number;
    roles: Role[];
    degrees: Degree[];
    promos: MockPromo[];
    skills: MockSkill[]
}

export interface MockStudent {
    id: number,
    firstName: string;
    lastName: string;
    birthdate: string;
    genre: Genre;
    email: String;
    password: String;
    isVerified: boolean;
    hasAcceptedTerms: boolean;
    hasAcceptedCookies: boolean;
    answeredTermsAt: number;
    createdBy: number;
    createdAt: number;
    editedAt?: null | number;
    roles: Role[];
    degrees: Degree[];
    promos: MockPromo[];
    skills: MockSkill[]
}

export interface Brief {
    id: number,
    name: string,
    content: string,
    createdAt: number,
    editedAt: number | null,
    status: string,
    authorId: number
}

