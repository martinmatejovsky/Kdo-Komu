import type {Balance, Transaction} from "./types.ts";

export default function settleDebts(balances: Balance[]): Transaction[] {
    const debtors = balances.filter(b => b.amount < 0).map(b => ({...b}));
    const creditors = balances.filter(b => b.amount > 0).map(b => ({...b}));
    const transactions: Transaction[] = [];

    let d = 0, c = 0;

    while (d < debtors.length && c < creditors.length) {
        const debtor = debtors[d];
        const creditor = creditors[c];

        const amount = Math.min(-debtor.amount, creditor.amount);

        transactions.push({
            from: debtor.userId,
            to: creditor.userId,
            amount
        });

        // update balances
        debtor.amount += amount;
        creditor.amount -= amount;

        if (debtor.amount === 0) d++;
        if (creditor.amount === 0) c++;
    }

    return transactions;
}