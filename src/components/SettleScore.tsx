import type {Group} from "../assets/types.ts";
import calculateBalances from "../assets/calculateBalances.ts";
import settleDebts from "../assets/settleDebts.ts";
import "../styles/settle-score.scss"

interface Properties {
    group: Group
}

function SettleScore({group}: Properties) {
    const balances = calculateBalances(group);
    const transactions = settleDebts(balances);

    return (
        <section className={'section'}>
            <h2>Vyrovnání plateb</h2>

            {transactions.length === 0 ? (
                <p>Skupina je vyrovnaná.</p>
            ) : (
                <ul className={'settle-score__list'}>
                    {transactions.map((transaction, index) => {
                        const from = group.members.find(m => m.id === transaction.from)?.name;
                        const to = group.members.find(m => m.id === transaction.to)?.name;
                        return (
                            <li key={index}>
                                {from} → {to}: {transaction.amount.toFixed(2).replace('.', ',')} Kč
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    )
}

export default SettleScore