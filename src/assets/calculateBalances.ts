import type {Group, Balance} from "./types.ts"

export default function calculateBalances(group: Group): Balance[] {
    const balances: Record<number, number> = {};

    for (const member of group.members) {
        balances[member.id] = 0;
    }

    for (const payment of group.payments) {
        const share = payment.amount / payment.to.length;

        balances[payment.from] += payment.amount;

        for (const userId of payment.to) {
            balances[userId] -= share;
        }
    }

    return Object.entries(balances).map(([userId, amount]) => ({
        userId: Number(userId),
        amount
    }));
}