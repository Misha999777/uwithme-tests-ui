import { Fragment } from 'react'

import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Offcanvas } from 'react-bootstrap'

import { selectIsMenuOpened, testsActions } from '../../store/tests/testsSlice'
import { useWindowSize } from '../../hooks/useWindowSize'
import TestSelector from './TestSelector'
import Timer from '../session/Timer'

import logo from '../../assets/logo512.png'
import '../../styles/Menu.css'

export default function Menu() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [width] = useWindowSize()

  const isMenuOpened = useSelector(selectIsMenuOpened)

  const elements = pathname === '/test' ? <Timer /> : <TestSelector />

  return (
    <Fragment>
      {width > 767 ? (
        <Navbar className="flex-column left-menu">
          {elements}
        </Navbar>
      ) : (
        <Offcanvas
          renderStaticNode
          show={isMenuOpened}
          onHide={() => dispatch(testsActions.menuToggled())}
        >
          <Offcanvas.Header closeButton>
            <img
              alt="logo"
              src={logo}
              height="40px"
            />
          </Offcanvas.Header>
          <Offcanvas.Body className="text-center">
            {elements}
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </Fragment>
  )
}
