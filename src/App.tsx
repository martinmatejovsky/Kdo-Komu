import {USERS, PAYMENTS} from './assets/MockHistory.ts'
import {useCallback, useMemo, useState} from "react";
import './styles/app.css'
import PaymentOverview from "./components/PaymentIOverview.tsx";

function App() {
    const [creatingPayment, setCreatingPayment] = useState(false)

    return (
        <div>
            <h1>
                Kdo-Komu
            </h1>

            <div className="controls">
                <button type={'button'} className={'new-payment'} onClick={() => {
                    setCreatingPayment((oldVal) => !oldVal)
                }}>
                    Nová platba
                </button>
            </div>

            <section>
                <h2>Lidé</h2>
                <p>
                    {USERS.map((u) => u.name).join(', ')}
                </p>
            </section>

            <PaymentOverview payments={PAYMENTS} users={USERS}/>
        </div>
    )
}

export default App
