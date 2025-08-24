import {USERS} from '../assets/MockHistory'
import '../styles/form.scss'
import {type FormEvent, useState} from "react";
import type {Payment} from "../assets/types.ts";

interface Props {
    addPayment: (newPaymet: Payment) => void,
    onSubmit?: Function
}

function FormNewPayment({addPayment, onSubmit}: Props) {
    const [paidForError, setPaidForError] = useState(false)

    function submitNewPayment(e: FormEvent) {
        e.preventDefault();
        setPaidForError(false)

        const formData = new FormData(e.target as HTMLFormElement);
        const paidFor = formData.getAll('paid-for');
        if (paidFor.length === 0) {
            setPaidForError(true)
            return
        }
        const amount = formData.get('amount');
        const paidBy = formData.get('paid-by');
        const topic = formData.get('topic');

        const newItem: Payment = {
            id: Date.now(),
            from: Number(paidBy),
            to: paidFor.map((el) => Number(el)),
            amount: Number(amount),
            subject: String(topic),
        }
        addPayment(newItem)

        const form = document.getElementById('new-payment');
        if (form instanceof HTMLFormElement) form.reset()
        if (onSubmit) onSubmit()
    }

    return (
        <form className={'form'} id={'new-payment'} onSubmit={(e) => submitNewPayment(e)}>
            <div className={'form-row'}>
                <label htmlFor="amount">Kolik</label>
                <input type="number" id={'amount'} name={'amount'} defaultValue={undefined} required={true}/>
            </div>

            <div className={'form-row'}>
                <label htmlFor={'paid-by'}>Kdo platil</label>
                <select name="paid-by" id="paid-by" required={true}>
                    {USERS.map((user) => {
                        return (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        )
                    })}
                </select>
            </div>

            <fieldset className={'form-row'} name={'paid-for'}>
                <legend>Za tyto lidi</legend>
                {paidForError && (
                    <p className={'form-error'}>Je nutné vybrat alespoň jednu možnost</p>
                )}

                {USERS.map((user) => (
                    <label key={user.id} htmlFor={`paid-for-${user.id}`}>
                        <input id={`paid-for-${user.id}`} name={`paid-for`} type="checkbox"
                               value={user.id}/>
                        {user.name}
                    </label>
                ))}
            </fieldset>

            <div className={'form-row'}>
                <label htmlFor="topic">Předmět platby (volitelné)</label>
                <input type="text" id={'topic'} name={'topic'}/>
            </div>

            <div className="controls">
                <button type={'submit'} className={'primary'}>Přidat do plateb</button>
            </div>
        </form>
    )
}

export default FormNewPayment