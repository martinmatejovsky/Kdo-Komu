import './styles/app.css'
import {Routes, Route} from 'react-router-dom'
import PageProjectDashboard from "./pages/PageProjectDashboard.tsx";
import PageHome from "./pages/PageHome.tsx";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<PageHome/>}></Route>
            <Route path={'/project'} element={<PageProjectDashboard/>}></Route>
        </Routes>
    )
}

export default App
