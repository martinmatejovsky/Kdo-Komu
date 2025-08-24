import {type Dispatch, type SetStateAction, useState} from "react";
import Overlay from "../components/Overlay.tsx";
import FormNewGroup from "../components/FormNewGroup.tsx";
import type {Group} from "../assets/types.ts"
import '../styles/page-home.scss'
import {useNavigate} from "react-router-dom";

interface Props {
    groups: Group[],
    setGroups: Dispatch<SetStateAction<Group[]>>
}

function PageHome({groups, setGroups}: Props) {
    const [modalNewProject, setModalNewProject] = useState(false)
    let navigate = useNavigate()

    function setNewGroup(newGroup: Group) {
        setGroups([...groups, newGroup])
    }

    function openGroup(id: number): void {
        navigate(`/group/${id}`)
    }

    return (
        <div className={'page-home'}>
            <h1>Kdo-Komu</h1>

            <main>
                <p>Aplikace pro výpočet vyrovnání plateb ve skupině lidí</p>

                <div className="controls">
                    <button type={"button"} className={'primary'} onClick={() => setModalNewProject(true)}>Nová skupina
                    </button>
                </div>

                <section className="page-home__groups">
                    <h2>Stávající skupiny</h2>

                    {groups.length === 0 && <p>Zatím nemáte žádnou uloženou skupinu</p>}

                    {groups.map((g) => (
                        <div key={g.id} className="page-home__group-tile" onClick={() => openGroup(g.id)}>
                            <span className="page-home__group-tile--name">{g.name}</span>
                            <span>členové:&nbsp;
                                {g.members.map(m => m.name).join(', ')}
                            </span>
                        </div>
                    ))}
                </section>
            </main>

            {modalNewProject && <Overlay title={'Vytvořit novou skupinu'} setClose={() => setModalNewProject(false)}>
              <FormNewGroup setNewGroup={setNewGroup} onSubmit={() => setModalNewProject(false)}/>
            </Overlay>}
        </div>
    )
}

export default PageHome