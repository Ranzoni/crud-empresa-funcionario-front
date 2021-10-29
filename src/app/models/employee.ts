import { Company } from "./company";
import { Position } from "./position";

export interface Employee {
    id: number;
    name: string;
    idPosition: number;
    position?: Position;
    salary: number;
    idCompany: number;
    company?: Company;
}