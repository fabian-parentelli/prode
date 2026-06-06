import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/utils/ScrollToTop.jsx";

import Navbar from "../containers/Navbar/Navbar.jsx";
import Session from "../containers/layouts/Session/Session.jsx";
import Teams from "../containers/layouts/Teams/Teams.jsx";
import Groups from "../containers/layouts/Groups/Groups.jsx";
import Games from "../containers/layouts/Games/Games.jsx";
import Body from "../containers/Body/Body.jsx";

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
                </Routes>

            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Router;