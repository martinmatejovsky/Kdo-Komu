import {USERS, PAYMENTS} from './assets/MockHistory.ts'
import {useState} from "react";
import './styles/app.css'
import PaymentOverview from "./components/PaymentIOverview.tsx";
import Overlay from "./components/Overlay.tsx";

function App() {
    const [creatingPayment, setCreatingPayment] = useState(false)

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

            <PaymentOverview payments={PAYMENTS} users={USERS}/>

            {creatingPayment &&
                <Overlay title={'Nová platba'} setClose={setCreatingPayment}>
                  ...overlay content
                </Overlay>
            }
        </div>
    )
}

export default App
