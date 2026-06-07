import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/utils/ScrollToTop.jsx";

import Navbar from "../containers/Navbar/Navbar.jsx";
import Session from "../containers/layouts/Session/Session.jsx";
import Teams from "../containers/layouts/Teams/Teams.jsx";
import Groups from "../containers/layouts/Groups/Groups.jsx";
import Games from "../containers/layouts/Games/Games.jsx";
import Body from "../containers/Body/Body.jsx";
import Stadiums from "../containers/layouts/Stadiums/Stadiums.jsx";
import Predictions from "../containers/layouts/Predictions/Predictions.jsx";

const Router = () => {

    return (
        <BrowserRouter>
            <ScrollToTop>

                <Navbar />

                <Routes>
                    <Route path='/' element={<Body />} />
                    <Route path='/user/session' element={<Session />} />
                    <Route path='/teams' element={<Teams />} />
                    <Route path='/groups' element={<Groups />} />
                    <Route path='/games' element={<Games />} />
                    <Route path='/stadiums' element={<Stadiums />} />
                    <Route path='/prediction' element={<Predictions />} />
                </Routes>

            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Router;