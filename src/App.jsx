import {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAdminLoading} from "./store/tests/testsApiSlice";
import {selectSessionLoading} from "./store/session/sessionApiSlice";
import {authService, isAdmin} from "./service/authService";
import LoadingIndicator from "./components/common/LoadingIndicator";
import Header from "./components/navigation/Header";
import Menu from "./components/navigation/Menu";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/App.css";

export default function App() {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const adminLoading = useSelector(selectAdminLoading);
    const studentLoading = useSelector(selectSessionLoading);

    const loading = adminLoading || studentLoading;

    const loggedIn = authService.isLoggedIn();
    const admin = isAdmin();

    useEffect(() => {
        if (pathname === "/" && admin) {
            navigate("/admin");
        }
        if (pathname === "/admin" && !admin) {
            navigate("/start");
        }
    }, [pathname, admin, navigate])

    if (!loggedIn) {
        return <LoadingIndicator/>;
    }

    return (
        <LoadingIndicator loading={loading}>
            <Header/>
            <div className="d-flex">
                <Menu/>
                <div className="w-100 ps-3 pe-3 mt-5">
                    <Outlet/>
                </div>
            </div>
        </LoadingIndicator>
    );
}