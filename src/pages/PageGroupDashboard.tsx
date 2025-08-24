import {USERS} from "../assets/MockHistory.ts";
import PaymentOverview from "../components/PaymentsOverview.tsx";
import Overlay from "../components/Overlay.tsx";
import FormNewPayment from "../components/FormNewPayment.tsx";
import {type Dispatch, type SetStateAction, useState} from "react";
import type {Group} from "../assets/types.ts"
import {useParams, useNavigate} from "react-router-dom";

interface Props {
    groups: Group[],
    setGroups: Dispatch<SetStateAction<Group[]>>
}

function PageGroupDashboard({groups, setGroups}: Props) {
    const selectedGroupId = Number(useParams().groupId);

    const group = groups.find((g) => g.id === selectedGroupId);
    if (!group) {
        return (
            <p>Nenalezena skupina s tímto ID</p>
        )
    }

    let navigate = useNavigate()
    const [creatingPayment, setCreatingPayment] = useState(false)

    return (
        <div>
            <h1>
                {group.name}
            </h1>

            <div className="controls">
                <button type={'button'} className={'secondary'} onClick={() => navigate('/')}>
                    Zpět
                </button>

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

            <PaymentOverview payments={group.payments} users={USERS}/>

            {creatingPayment &&
                <Overlay title={'Nová platba'} setClose={setCreatingPayment}>
                  <FormNewPayment setGroups={setGroups} selectedGroupId={selectedGroupId}
                                  onSubmit={() => setCreatingPayment(false)}/>
                </Overlay>
            }
        </div>
    )
}

export default PageGroupDashboard