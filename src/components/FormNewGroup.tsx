import '../styles/form.scss'
import {type FormEvent, useCallback, useState} from "react";
import type {Group, User} from "../assets/types.ts";

interface Props {
    setNewGroup: (newGroup: Group) => void,
    onSubmit?: () => void
}

function FormNewGroup({setNewGroup, onSubmit}: Props) {
    const [groupName, setGroupName] = useState('')
    const [newMember, setNewMember] = useState('')
    const [members, setMembers] = useState<User[]>([])
    const [noMembersError, setNoMembersError] = useState(false)

    const submitForm = useCallback((e: FormEvent, groupName: string) => {
        e.preventDefault()

        if (members.length === 0) {
            setNoMembersError(true)
            return
        }

        const newGroup = {
            id: Date.now(),
            name: groupName,
            members: members,
            payments: []
        }

        setNewGroup(newGroup)
        if (onSubmit) onSubmit()
    }, [members, setNewGroup])

    const addMember = useCallback((name: string) => {
        if (!name) return

        const newPerson = {
            id: members.length ? members[members.length - 1].id + 1 : 0,
            name: name
        }
        setMembers([...members, newPerson])
        setNewMember('')
    }, [members])

    return (
        <form className={'form'} onSubmit={(e) => submitForm(e, groupName)}>
            <div className="form-row">
                <label htmlFor="groupName">Jméno skupiny</label>
                <input type="text" value={groupName} name={'groupName'} id={'groupName'} required={true}
                       onChange={e => setGroupName(e.target.value)}/>
            </div>

            <fieldset>
                <legend>Členové</legend>

                {noMembersError && (
                    <p className={'form-error'}>Je nutné zadat alespoň jednoho člena skupiny</p>
                )}

                <label htmlFor="memberName">Jméno člena</label>
                <div className={'input-controls'}>
                    <input type="text" value={newMember} name={'memberName'} id={'memberName'}
                           onChange={e => setNewMember(e.target.value)}/>
                    <button type={'button'} className={'secondary'} onClick={() => addMember(newMember)}>přidat</button>
                </div>

                <ul className={'form-list'}>
                    {members.map(member => (
                        <li key={member.id}>
                            <strong>{member.name}</strong>,
                        </li>
                    ))}
                </ul>
            </fieldset>

            <div className="controls">
                <button type={'submit'} className={'primary'} disabled={!groupName || members.length === 0}>
                    Založit skupinu
                </button>
            </div>
        </form>
    )
}

export default FormNewGroup