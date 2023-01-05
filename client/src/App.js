import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import { Provider } from 'react-redux'
import CreateBugs from './pages/Bug/CreateBug'
import ViewProjects from './pages/Projects/ViewProjects'
import Login from './auth/Login'
import Logout from './auth/Logout'
import store from './redux/store'
import CreateProjects from './pages/Projects/CreateProjects'
import NotFound from './pages/NotFound'
import Registrations from './auth/Registration'
import ForgotPassword from './pages/Password/ForgotPassword'
import ChangePassword from './pages/Password/ChangePassword'
import * as Path from './constants'

function App() {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path={Path.ViewProjects} element={<ViewProjects />} />
            <Route path={Path.CreateBugs} element={<CreateBugs />} />
            <Route path={Path.CreateProjects} element={<CreateProjects />} />
            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.Registration} element={<Registrations />} />
            <Route path={Path.Logout} element={<Logout />} />
            <Route path={Path.ForgotPassword} element={<ForgotPassword />} />
            <Route path={Path.ChangePassword} element={<ChangePassword />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </SnackbarProvider>
  )
}

export default App
