import {USERS, PAYMENTS} from './assets/MockHistory.ts'
import {useMemo} from "react";
import PaymentRecord from "./components/PaymentRecord.tsx";
import type {PaymentDescription} from './assets/types.ts'
import './styles/app.css'

function App() {
    const paymentTags = useMemo((): PaymentDescription[] => {
        return PAYMENTS.map(payment => {
            const paidForNames: string[] = payment.to.map((id) => {
                return USERS.find((user) => user.id === id)?.name || '-'
            })

            return {
                id: payment.id,
                paidByName: USERS.find((user) => user.id === payment.from)?.name || '-',
                paidForNames: paidForNames,
                amount: payment.amount,
                subject: payment.subject,
            }
        })
    }, []);

    return (
        <div>
            <h1>
                Kdo-Komu
            </h1>

            <section>
                <h2>Lidé</h2>
                <p>
                    {USERS.map((u) => u.name).join(', ')}
                </p>
            </section>

            <section>
                <h2>Platby</h2>
                <ol className={'payment-list'}>
                    {paymentTags.map((payment) => (
                        <li key={payment.id}>
                            <PaymentRecord data={payment}></PaymentRecord>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    )
}

export default App
