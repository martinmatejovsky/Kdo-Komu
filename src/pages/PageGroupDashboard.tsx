import PaymentOverview from "../components/PaymentsOverview.tsx";
import Overlay from "../components/Overlay.tsx";
import FormNewPayment from "../components/FormNewPayment.tsx";
import {type Dispatch, type SetStateAction, useReducer} from "react";
import type {Group, ActionGroupDashboard} from "../assets/types.ts"
import {useParams, useNavigate} from "react-router-dom";
import "../styles/page-group.scss"
import SettleScore from "../components/SettleScore.tsx";
import GroupMembersList from "../components/GroupMembersList.tsx";

interface Props {
    groups: Group[],
    setGroups: Dispatch<SetStateAction<Group[]>>
}

interface State {
     newPayment:boolean,
     editPayment: number | null,
 }

function reducer(state: State, action: ActionGroupDashboard): State {
    switch (action.type) {
        case 'toggleNewPayment':
            return {...state, newPayment: !state.newPayment}
        case 'toggleEditPayment':
            return {...state, editPayment: action?.data || null, }
        default:
            return {...state}
    }
}

function PageGroupDashboard({groups, setGroups}: Props) {
    const selectedGroupId = Number(useParams().groupId);
    const navigate = useNavigate()
    const [stateGroupDashboard, dispatchGroupDashboard] = useReducer(reducer, {newPayment: false, editPayment: null})

    const group = groups.find((g) => g.id === selectedGroupId);
    if (!group) {
        return (
            <p>Nenalezena skupina s tímto ID</p>
        )
    }

    return (
        <div className={'page-group'}>
            <h1>
                {group.name}
            </h1>

            <div className="controls">
                <button type={'button'} className={'secondary'} onClick={() => navigate('/')}>
                    Zpět
                </button>

                <button type={'button'} className={'primary new-payment'} onClick={() => dispatchGroupDashboard({type: 'toggleNewPayment'})}>
                    nová platba
                </button>
            </div>

            <GroupMembersList group={group}/>

            <PaymentOverview payments={group.payments} users={group.members} dispatchGroupDashboard={dispatchGroupDashboard}/>

            <SettleScore group={group}/>

            {stateGroupDashboard.newPayment &&
                <Overlay title={'Nová platba'} setClose={() => dispatchGroupDashboard({type: 'toggleNewPayment'})}>
                  <FormNewPayment setGroups={setGroups} selectedGroupId={selectedGroupId} users={group.members}
                                  onSubmit={() => dispatchGroupDashboard({type: 'toggleNewPayment'})}/>
                </Overlay>
            }

            {stateGroupDashboard.editPayment &&
              <Overlay setClose={() => dispatchGroupDashboard({type: 'toggleEditPayment', data: null})}>
                <FormNewPayment setGroups={setGroups} selectedGroupId={selectedGroupId} users={group.members} groups={groups} editedPaymentId={stateGroupDashboard.editPayment}
                                onSubmit={() => dispatchGroupDashboard({type: 'toggleEditPayment', data: null})}/>
              </Overlay>
            }
        </div>
    )
}

export default PageGroupDashboard
