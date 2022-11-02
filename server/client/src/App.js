import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateBugs from "./components/Bug/CreateBug"
import ViewBugs from "./components/Bug/ViewBugs"
import ViewProjects from "./components/Projects/ViewProjects"
import Login from "./auth/Login"
import Logout from "./auth/Logout"
import { Provider } from "react-redux"
import store from "./redux/store"
import SnackbarProvider from "react-simple-snackbar"
import CreateProjects from "./components/Projects/CreateProjects"
import NotFound from "./pages/NotFound"
import Registrations from "./auth/Registration"
import ForgotPassword from "./components/password/ForgotPassword"
import ChangePassword from "./components/password/ChangePassword"
function App() {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ViewProjects />} />
            <Route path="/create-bugs" element={<CreateBugs />} />
            <Route path="/create-projects" element={<CreateProjects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registrations />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </SnackbarProvider>
  )
}

export default App
