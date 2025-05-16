export interface Credentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string[];
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
    role: string[];
    is_verified: boolean;
    has_accepted_terms: boolean;
    has_accepted_cookies: boolean;
    answered_terms_at: number;
    created_at: number;
    created_by: null | number;
    edited_at: null | number;
}
