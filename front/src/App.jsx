import Router from './Router/Router.jsx';
import LoginProvider from "./context/LoginContext.jsx";
import AlertProvider from "./context/AlertContext.jsx";

const App = () => {

    return (
        <AlertProvider>
            <LoginProvider>
                <Router />
            </LoginProvider>
        </AlertProvider>
    );
};

export default App;