import PaymentOverview from "../components/PaymentsOverview.tsx";
import Overlay from "../components/Overlay.tsx";
import FormNewPayment from "../components/FormNewPayment.tsx";
import {type Dispatch, type SetStateAction, useState} from "react";
import type {Group} from "../assets/types.ts"
import {useParams, useNavigate} from "react-router-dom";
import "../styles/page-group.scss"
import SettleScore from "../components/SettleScore.tsx";
import GroupMembersList from "../components/GroupMembersList.tsx";

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
        <div className={'page-group'}>
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

            <GroupMembersList group={group}/>

            <PaymentOverview payments={group.payments} users={group.members}/>

            <SettleScore group={group}/>

            {creatingPayment &&
                <Overlay title={'Nová platba'} setClose={setCreatingPayment}>
                  <FormNewPayment setGroups={setGroups} selectedGroupId={selectedGroupId} users={group.members}
                                  onSubmit={() => setCreatingPayment(false)}/>
                </Overlay>
            }
        </div>
    )
}

export default PageGroupDashboard