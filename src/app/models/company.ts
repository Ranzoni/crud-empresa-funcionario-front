import { Address } from "./address";

export interface Company {
    id: number;
    name: string;
    idAddress: number;
    address: Address;
    phoneNumber: string | null;
}