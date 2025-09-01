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
     deletePayment: number | null,
 }

function reducer(state: State, action: ActionGroupDashboard): State {
    switch (action.type) {
        case 'toggleNewPayment':
            return {...state, newPayment: !state.newPayment}
        case 'toggleEditPayment':
            return {...state, editPayment: action?.data || null, }
        case 'toggleDeletePayment':
            return {...state, deletePayment: action?.data || null }
        default:
            return {...state}
    }
}

function PageGroupDashboard({groups, setGroups}: Props) {
    const selectedGroupId = Number(useParams().groupId);
    const navigate = useNavigate()
    const [stateGroupDashboard, dispatchGroupDashboard] = useReducer(reducer, {newPayment: false, editPayment: null, deletePayment: null})

    const group = groups.find((g) => g.id === selectedGroupId);
    if (!group) {
        return (
            <p>Nenalezena skupina s tímto ID</p>
        )
    }

    function confirmDeletePayment() {
        setGroups(oldVal => (
            oldVal.map(g => {
                if (g.id !== selectedGroupId) return g

                const newPayments = g.payments.filter(p => p.id !== stateGroupDashboard.deletePayment)
                return {...g, payments: newPayments}
            })
        ))
        stateGroupDashboard.deletePayment = null
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
              <Overlay setClose={() => dispatchGroupDashboard({type: 'toggleEditPayment'})}>
                <FormNewPayment setGroups={setGroups} selectedGroupId={selectedGroupId} users={group.members} groups={groups} editedPaymentId={stateGroupDashboard.editPayment}
                                onSubmit={() => dispatchGroupDashboard({type: 'toggleEditPayment', data: null})}/>
              </Overlay>
            }

            {stateGroupDashboard.deletePayment &&
                <Overlay setClose={() => dispatchGroupDashboard({type: 'toggleDeletePayment'})}>
                  <div className="page-group__confirmation">
                    Chcete smazat tuto platbu?

                      <div className="controls">
                          <button className={'secondary'} onClick={confirmDeletePayment}>Ano</button>
                          <button className={'secondary'} onClick={() => dispatchGroupDashboard({type: 'toggleDeletePayment'})}>Ne</button>
                      </div>
                  </div>
                </Overlay>
            }
        </div>
    )
}

export default PageGroupDashboard
