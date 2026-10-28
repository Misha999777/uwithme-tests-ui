import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

import { testsActions } from '../../store/tests/testsSlice'
import { sessionActions } from '../../store/session/sessionSlice'
import { useWindowSize } from '../../hooks/useWindowSize'
import { authService } from '../../service/authService'

import logo from '../../assets/logo512.png'
import styles from '../../styles/Header.module.css'

export default function Header() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [width] = useWindowSize()

  return (
    <Nav className={`ps-3 pe-3 navbar ${styles.toolbar}`}>
      {width < 767 && pathname !== '/start' ? (
        <Navbar.Toggle
          onClick={() => dispatch(testsActions.menuToggled())}
        />
      ) : (
        <img
          alt="logo"
          src={logo}
          height="40px"
        />
      )}
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
  )
}
