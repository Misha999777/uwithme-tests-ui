import { useEffect } from 'react'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectAdminLoading } from './store/tests/testsApiSlice'
import { selectSessionLoading } from './store/session/sessionApiSlice'
import { authService, hasAdminRole } from './service/authService'
import LoadingIndicator from './components/common/LoadingIndicator'
import Header from './components/navigation/Header'
import Menu from './components/navigation/Menu'

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/App.css'

export default function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const adminLoading = useSelector(selectAdminLoading)
  const studentLoading = useSelector(selectSessionLoading)

  const isLoading = adminLoading || studentLoading
  const shouldShowMenu = pathname !== '/' && pathname !== '/start'

  const isLoggedIn = authService.isLoggedIn()
  const isAdmin = hasAdminRole()

  useEffect(() => {
    if (pathname === '/' && isAdmin) {
      navigate('/admin')
    }
    if (pathname === '/' && !isAdmin) {
      navigate('/start')
    }
  }, [pathname, isAdmin, navigate])

  if (!isLoggedIn) {
    return <LoadingIndicator />
  }

  return (
    <LoadingIndicator loading={isLoading}>
      <Header />
      <div className="row w-100 m-0 pt-5">
        <div className="col">
          {shouldShowMenu && <Menu />}
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          {shouldShowMenu && <Outlet />}
        </div>
        {!shouldShowMenu && <Outlet />}
      </div>
    </LoadingIndicator>
  )
}
