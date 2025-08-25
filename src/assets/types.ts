export interface User {
    id: number,
    name: string
}

export interface Payment {
    id: number
    from: number,
    to: number[],
    amount: number
    subject?: string,
}

export interface PaymentDescription {
    id: number
    paidByName: string,
    paidForNames: string[],
    amount: number,
    subject?: string,
}

export interface Group {
    id: number,
    name: string,
    members: User[],
    payments: Payment[],
}

export interface Balance {
    userId: number,
    amount: number,
}

export interface Transaction {
    from: number;
    to: number;
    amount: number;
}