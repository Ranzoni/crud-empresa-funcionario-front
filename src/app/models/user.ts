import { Company } from "./company";

export interface User {
    username: string;
    password: string;
    idCompany: number;
    company: Company | null;
}