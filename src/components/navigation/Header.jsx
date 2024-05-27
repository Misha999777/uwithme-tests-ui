import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {testsActions} from "../../store/tests/testsSlice";
import {sessionActions} from "../../store/session/sessionSlice";
import {useWindowSize} from "../../hooks/useWindowSize";
import {authService} from "../../service/authService";
import {Button, Nav} from "react-bootstrap";
import logo from "../../assets/logo512.png";
import "../../styles/Header.css";

export default function Header() {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const [width] = useWindowSize();

    return (
        <Nav className="ps-3 pe-3 navbar toolbar">
            {width < 767 && pathname !== "/start"
                ?
                <i
                    className="fa fa-bars fa-2x"
                    onClick={() => dispatch(testsActions.menuToggled())}
                />
                :
                <img
                    alt="logo"
                    src={logo}
                    height={"40px"}
                />
            }
            <Button
                variant="purple"
                onClick={() => {
                    dispatch(sessionActions.sessionEnded())
                    authService.logout()
                }}
            >
                Вийти
            </Button>
        </Nav>
    );
}
