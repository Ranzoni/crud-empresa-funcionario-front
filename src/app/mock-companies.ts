import { Company } from "./models/company";

export const COMPANIES: Company[] = [
    {
        id: 1,
        name: 'Coca-Cola',
        idAddress: 1,
        address: {
            id: 1,
            street: 'Avenida Saudade',
            number: '1258',
            address2: null,
            neighborhood: 'Campos Elíseos',
            city: 'Ribeirão Preto',
            state: 'SP',
            country: 'Brasil',
            zipCode: '1400000'
        },
        phoneNumber: '1633112255'
    },
    {
        id: 2,
        name: 'Dolly',
        idAddress: 2,
        address: {
            id: 2,
            street: 'Avenida Dom Pedro I',
            number: '55',
            address2: null,
            neighborhood: 'Ipiranga',
            city: 'Ribeirão Preto',
            state: 'SP',
            country: 'Brasil',
            zipCode: '14055000'
        },
        phoneNumber: '1633112255'
    },
    {
        id: 3,
        name: 'Pistão',
        idAddress: 3,
        address: {
            id: 3,
            street: 'Avenida Saudade',
            number: '1258',
            address2: '',
            neighborhood: 'Campos Elíseos',
            city: 'Ribeirão Preto',
            state: 'SP',
            country: 'Brasil',
            zipCode: '1400000'
        },
        phoneNumber: '1633112255'
    },
    {
        id: 4,
        name: 'Geléia',
        idAddress: 4,
        address: {
            id: 4,
            street: 'Avenida Saudade',
            number: '1258',
            address2: '',
            neighborhood: 'Campos Elíseos',
            city: 'Ribeirão Preto',
            state: 'SP',
            country: 'Brasil',
            zipCode: '1400000'
        },
        phoneNumber: '1633112255'
    },
  ];