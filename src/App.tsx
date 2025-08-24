import './styles/app.css'
import {Routes, Route} from 'react-router-dom'
import PageGroupDashboard from "./pages/PageGroupDashboard.tsx"
import PageHome from "./pages/PageHome.tsx";
import type {Group} from "./assets/types.ts";
import {useState} from 'react'

function App() {
    const [groups, setGroups] = useState<Group[]>([])

    return (
        <Routes>
            <Route path={'/'} element={<PageHome groups={groups} setGroups={setGroups}/>}></Route>
            <Route path={'/group/:groupId'}
                   element={<PageGroupDashboard groups={groups} setGroups={setGroups}/>}></Route>
        </Routes>
    )
}

export default App
