import {useCallback, useMemo, useState} from "react";
import PaymentRecord from "./PaymentRecord.tsx";
import type {PaymentDescription, Payment, User} from "../assets/types.ts";
import {memo} from "react";

const lastVisiblePayments = 5

const PaymentOverview = memo(function PaymentOverview({payments, users}: { payments: Payment[], users: User[] }) {
    const [showingAllPayments, setShowingAllPayments] = useState(false)

    const convertPaymentLabels = useCallback((from: number, to: number) => {
        const visiblePayments: PaymentDescription[] = []

        for (const payment of payments.slice(from, to)) {
            const paidForNames: string[] = payment.to.map((id) => {
                return users.find((user) => user.id === id)?.name || '-'
            })

            visiblePayments.push({
                id: payment.id,
                paidByName: users.find((user) => user.id === payment.from)?.name || '-',
                paidForNames: paidForNames,
                amount: payment.amount,
                subject: payment.subject,
            })
        }
        return visiblePayments
    }, [payments, users])

    const lastPaymentTags = useMemo((): PaymentDescription[] => {
        return convertPaymentLabels(0, lastVisiblePayments)
    }, [convertPaymentLabels]);

    const restPaymentTags = useMemo((): PaymentDescription[] => {
        if (!showingAllPayments || payments.length <= lastVisiblePayments) return []

        return convertPaymentLabels(lastVisiblePayments, payments.length)
    }, [payments, showingAllPayments, convertPaymentLabels])

    return (
        <section>
            <h2>Provedené platby</h2>
            <div className="payment-wrapper">
                <ol className={'payment-list'}>
                    {lastPaymentTags.map((payment) => (
                        <li key={payment.id}>
                            <PaymentRecord data={payment}/>
                        </li>
                    ))}

                    {restPaymentTags.length > 0 && restPaymentTags.map((payment) => (
                        <li key={payment.id}>
                            <PaymentRecord data={payment}/>
                        </li>
                    ))}
                </ol>
            </div>

            <button type={'button'} className={'payment-list-toggle'} onClick={() => {
                setShowingAllPayments((oldVal) => !oldVal)
            }}>
                {showingAllPayments ? 'schovej starší' : 'ukaž starší'}
            </button>
        </section>
    )
})

export default PaymentOverview