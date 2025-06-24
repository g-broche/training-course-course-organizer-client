import { UserDTO } from "./dto";

export interface AuthResponse {
    user: UserDTO;
    token: string;
}