import {USERS, PAYMENTS} from './assets/MockHistory.ts'
import {useState} from "react";
import './styles/app.css'
import PaymentOverview from "./components/PaymentIOverview.tsx";
import Overlay from "./components/Overlay.tsx";
import FormNewPayment from "./components/FormNewPayment.tsx";

function App() {
    const [creatingPayment, setCreatingPayment] = useState(false)
    const [payments, setPayments] = useState(PAYMENTS)

    return (
        <div>
            <h1>
                Kdo-Komu
            </h1>

            <div className="controls">
                <button type={'button'} className={'primary new-payment'} onClick={() => {
                    setCreatingPayment((oldVal) => !oldVal)
                }}>
                    nová platba
                </button>
            </div>

            <section>
                <h2>Lidé</h2>
                <p>
                    {USERS.map((u) => u.name).join(', ')}
                </p>
            </section>

            <PaymentOverview payments={payments} users={USERS}/>

            {creatingPayment &&
                <Overlay title={'Nová platba'} setClose={setCreatingPayment}>
                  <FormNewPayment setPayments={setPayments} onSubmit={() => setCreatingPayment(false)}/>
                </Overlay>
            }
        </div>
    )
}

export default App
