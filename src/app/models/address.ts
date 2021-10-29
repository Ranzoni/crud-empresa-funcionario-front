export interface Address {
    id: number;
    street: string;
    number: string;
    address2: string | null;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}