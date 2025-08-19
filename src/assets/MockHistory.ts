import type {User, Payment} from "./types.ts";

export const USERS: User[] = [
    {
        id: 0,
        name: 'Alice'
    },
    {
        id: 1,
        name: 'Bob'
    },
    {
        id: 2,
        name: 'Cyan'
    }
]

export const PAYMENTS: Payment[] = [
    {
        id: 0,
        from: 0,
        to: [1, 2],
        amount: 100
    },
    {
        id: 1,
        from: 1,
        to: [0, 2],
        amount: 150,
        subject: 'Kino v Bautumi'
    },
    {
        id: 2,
        from: 2,
        to: [1, 2, 0],
        amount: 1280
    },
]