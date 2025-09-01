import '../styles/form.scss'
import {type Dispatch, type FormEvent, type SetStateAction, useMemo, useState} from "react";
import type {Group, Payment, User} from "../assets/types.ts";

interface Props {
    setGroups: Dispatch<SetStateAction<Group[]>>,
    selectedGroupId: number,
    users: User[],
    groups?: Group[],
    editedPaymentId?: number | null,
    onSubmit?: () => void,
}

function FormNewPayment({setGroups, selectedGroupId, users, groups, editedPaymentId, onSubmit}: Props) {
    const [paidForError, setPaidForError] = useState(false)
    const formHtmlId = 'new-payment'

    const paymentToEdit: Payment | undefined = useMemo(() => {
        return editedPaymentId
        ? groups?.find(g => g.id === selectedGroupId)?.payments.find(p => p.id === editedPaymentId)
            : undefined
    }, [groups, selectedGroupId, editedPaymentId])

    function addPayment(newPayment: Payment): void {
        setGroups(oldVal => (
            oldVal.map(g => {
                if (g.id !== selectedGroupId) return g

                const payments = editedPaymentId
                    ? g.payments.map(p => (p.id === editedPaymentId ? newPayment : p))
                    : [...g.payments, newPayment];

                return { ...g, payments };
            }))
        )
    }

    function clearForm() {
        const form = document.getElementById(formHtmlId);
        if (form instanceof HTMLFormElement) form.reset()
    }

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
            id: editedPaymentId || Date.now(),
            from: Number(paidBy),
            to: paidFor.map((el) => Number(el)),
            amount: Number(amount),
            subject: String(topic),
        }

        addPayment(newItem)
        clearForm()
        if (onSubmit) onSubmit()
    }

    return (
        <form className={'form'} id={formHtmlId} onSubmit={(e) => submitNewPayment(e)}>
            <div className={'form-row'}>
                <label htmlFor="amount">Kolik</label>
                <input type="number" id={'amount'} name={'amount'} defaultValue={paymentToEdit?.amount} required={true}/>
            </div>

            <div className={'form-row'}>
                <label htmlFor={'paid-by'}>Kdo platil</label>
                <select name="paid-by" id="paid-by" required={true} defaultValue={paymentToEdit?.from}>
                    {users.map((user) => {
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

                {users.map((user) => (
                    <label key={user.id} htmlFor={`paid-for-${user.id}`}>
                        <input id={`paid-for-${user.id}`} name={`paid-for`} type="checkbox"
                               checked={paymentToEdit?.to.includes(user.id)} value={user.id}/>
                        <span className="form__checkbox-label">{user.name}</span>
                    </label>
                ))}
            </fieldset>

            <div className={'form-row'}>
                <label htmlFor="topic">Předmět platby (volitelné)</label>
                <input type="text" id={'topic'} name={'topic'} defaultValue={paymentToEdit?.subject}/>
            </div>

            <div className="controls">
                <button type={'submit'} className={'primary'}>
                    {paymentToEdit ? 'Portvrdit změnu' : 'Přidat do plateb'}
                </button>
            </div>
        </form>
    )
}

export default FormNewPayment