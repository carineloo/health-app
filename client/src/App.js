import Home from './pages/Home'
import TrainingVideos from './pages/TrainingVideos'
import Baseline from './pages/Baseline'
import Onboarding from './components/Onboarding'
import MyAccount from './pages/MyAccount'
import EQ5D_Form from './pages/EQ5D_Form'
import EQ5D_Data from './pages/EQ5D_Data'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import RoseQ from './pages/RoseQ'

const App = () => {

    const [cookies] = useCookies(['user'])
    const authToken = cookies.AuthToken

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {authToken && <Route path="/trainingvideos" element={<TrainingVideos />} />}
                <Route path="/baseline" element={<Baseline />} />
                {authToken && <Route path="/onboarding" element={<Onboarding />} />}
                {authToken && <Route path="/myaccount" element={<MyAccount />} />}
                {authToken && <Route path="/eq5d" element={<EQ5D_Form />} />}
                {authToken && <Route path="/eq5d_data" element={<EQ5D_Data />} />}
                {authToken && <Route path="/roseQ" element={<RoseQ />} />}
            </Routes>
        </BrowserRouter>
    )
}

export default App;
