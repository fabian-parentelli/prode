import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/utils/ScrollToTop.jsx";

import Navbar from "../containers/Navbar/Navbar.jsx";
import Session from "../containers/layouts/Session/Session.jsx";

const Router = () => {

    return (
        <BrowserRouter>
            <ScrollToTop>

                <Navbar />

                <Routes>
                    <Route path='/user/session' element={<Session />} />
                </Routes>

            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Router;