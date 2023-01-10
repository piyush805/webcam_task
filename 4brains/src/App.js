import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
    const user = useSelector(state => state.currentUser)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />} />
                <Route path="register" element={user ? <Navigate replace to="/" /> : <Register />} />
                <Route path="login" element={user != null ? <Navigate replace to="/" /> : <Login />} />

            </Routes>
        </BrowserRouter>

    );
}

export default App;
