import {useCallback, useMemo, useState} from "react";
import PaymentRecord from "./PaymentRecord.tsx";
import type {PaymentDescription, Payment, User} from "../assets/types.ts";
import {memo} from "react";
import '../styles/payment-overview.scss'

interface Props {
    payments: Payment[],
    users: User[]
}

const lastVisiblePayments = 4

const PaymentOverview = memo(function PaymentOverview({payments, users}: Props) {
    const [showingAllPayments, setShowingAllPayments] = useState(false)

    const reversedPayments = useMemo(() => [...payments].reverse(), [payments])

    const convertPaymentLabels = useCallback((to: number): PaymentDescription[] => {
        const visiblePayments: PaymentDescription[] = []

        for (const payment of reversedPayments.slice(0, to)) {
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
    }, [reversedPayments, users])

    const visiblePayments = useMemo((): PaymentDescription[] => {
        return showingAllPayments ?
            convertPaymentLabels(reversedPayments.length) :
            convertPaymentLabels(lastVisiblePayments)
    }, [reversedPayments, showingAllPayments, convertPaymentLabels])

    return (
        <section className={'section payments-overview'}>
            <h2>Provedené platby</h2>
            <div className="payments-overview__wrapper">
                {payments.length === 0 && (
                    <p>zatím nemáte žádnou uloženou platbu</p>
                )}

                <ol className={'payments-overview__list'}>
                    {visiblePayments.map((payment) => (
                        <li key={payment.id}>
                            <PaymentRecord data={payment}/>
                        </li>
                    ))}
                </ol>
            </div>

            {payments.length > lastVisiblePayments && (
                <div className="controls">
                    <button type={'button'} className={'primary'} onClick={() => {
                        setShowingAllPayments((oldVal) => !oldVal)
                    }}>
                        {showingAllPayments ? 'schovej starší' : 'ukaž starší'}
                    </button>
                </div>
            )}
        </section>
    )
})

export default PaymentOverview