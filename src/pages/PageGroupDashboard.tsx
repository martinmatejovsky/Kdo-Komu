import PaymentOverview from "../components/PaymentsOverview.tsx";
import Overlay from "../components/Overlay.tsx";
import FormNewPayment from "../components/FormNewPayment.tsx";
import {type Dispatch, type SetStateAction, useReducer} from "react";
import type {Group} from "../assets/types.ts"
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

 interface Action {
    type: string,
 data?: number | null,
 }

function reducer(state: State, action: Action): State {
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
    const [state, dispatch] = useReducer(reducer, {newPayment: false, editPayment: null})

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

                <button type={'button'} className={'primary new-payment'} onClick={() => dispatch({type: 'toggleNewPayment'})}>
                    nová platba
                </button>
            </div>

            <GroupMembersList group={group}/>

            <PaymentOverview payments={group.payments} users={group.members} dispatchGroupDashboard={dispatch}/>

            <SettleScore group={group}/>

            {state.newPayment &&
                <Overlay title={'Nová platba'} setClose={() => dispatch({type: 'toggleNewPayment'})}>
                  <FormNewPayment setGroups={setGroups} selectedGroupId={selectedGroupId} users={group.members}
                                  onSubmit={() => dispatch({type: 'toggleNewPayment'})}/>
                </Overlay>
            }

            {state.editPayment &&
              <Overlay setClose={() => dispatch({type: 'toggleEditPayment', data: null})}>
                <FormNewPayment setGroups={setGroups} selectedGroupId={selectedGroupId} users={group.members}
                                onSubmit={() => dispatch({type: 'toggleEditPayment', data: null})}/>
              </Overlay>
            }
        </div>
    )
}

export default PageGroupDashboard