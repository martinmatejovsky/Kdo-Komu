import {USERS} from '../assets/MockHistory'
import '../styles/formNewPayment.scss'

function FormNewPayment() {
    return (
        <form className={'form-new-payment'}>
            <div className={'form-row'}>
                <label htmlFor="amount">Kolik</label>
                <input type="number" id={'amount'} value={500}/>
            </div>

            <div className={'form-row'}>
                <label htmlFor={'paid-by'}>Kdo platil</label>
                <select name="paid-by" id="paid-by">
                    {USERS.map((user) => {
                        return (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        )
                    })}
                </select>
            </div>

            <fieldset className={'form-row'}>
                <legend>Za tyto lidi</legend>
                {USERS.map((user) => (
                    <label htmlFor={`paid-for-${user.id}`}>
                        <input key={user.id} id={`paid-for-${user.id}`} type="checkbox"/>
                        {user.name}
                    </label>
                ))}
            </fieldset>

            <div className={'form-row'}>
                <label htmlFor="topic">Předmět platby (volitelné)</label>
                <input type="text" id={'topic'}/>
            </div>

            <div className="controls">
                <button type={'submit'} className={'primary'}>Přidat do plateb</button>
            </div>
        </form>
    )
}

export default FormNewPayment