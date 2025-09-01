import '../styles/paymentRecord.scss'
import type {PaymentDescription} from "../assets/types.ts";
import {memo} from "react";

interface Props {
    data: PaymentDescription,
    reducerGroupDashboard: () => void,
}
const PaymentRecord = memo(function PaymentRecord({data, reducerGroupDashboard}: Props ) {
    function openEdit() {
        reducerGroupDashboard({type: 'toggleEditPayment', data: data.id})
    }

    return (
        <div className={'payment-record'}>
            <div className="payment-record__description">
                {data.subject && (
                    <div className="payment-record__subject">{data.subject}</div>
                )}
                <div className="payment-record__names">
                    <div>Plátce: <strong>{data.paidByName}</strong></div>
                    <div>za: {data.paidForNames.join(', ')}</div>
                </div>
            </div>

            <div className={'payment-record__price'}><strong>{data.amount} Kč</strong></div>

            <button className="payment-record__edit" onClick={openEdit}></button>
        </div>
    )
})

export default PaymentRecord