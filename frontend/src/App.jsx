import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear()
  return <Navigate to={'/login'} />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

export default function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/register" element={<RegisterAndLogout />} ></Route>
          <Route path="*" element={<NotFound />} ></Route>

        </Routes>
      </BrowserRouter>
    </>

  )
}