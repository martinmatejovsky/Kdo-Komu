import './styles/app.css'
import {Routes, Route} from 'react-router-dom'
import PageGroupDashboard from "./pages/PageGroupDashboard.tsx"
import PageHome from "./pages/PageHome.tsx";
import type {Group} from "./assets/types.ts";
import {useEffect, useState} from 'react'

const storageAppName = 'KdoKomu'

function App() {
    const [groups, setGroups] = useState<Group[]>(getLocalStorage)

    function getLocalStorage(): Group[] {
        const savedData = localStorage.getItem(storageAppName);
        return savedData ? JSON.parse(savedData) : []
    }

    useEffect(() => {
        localStorage.setItem(storageAppName, JSON.stringify(groups))
    }, [groups])

    return (
        <Routes>
            <Route path={'/'} element={<PageHome groups={groups} setGroups={setGroups}/>}></Route>
            <Route path={'/group/:groupId'}
                   element={<PageGroupDashboard groups={groups} setGroups={setGroups}/>}></Route>
        </Routes>
    )
}

export default App
