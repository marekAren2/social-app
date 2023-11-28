import { Routes, Route } from "react-router-dom"

import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";



// 18:54 wstawiam props
const AppRoutes = (props) => {
// const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            {/* // 19:12 przez props do Login */}
            {/* // 29:02 w AppRouters do Loginu user */}
            <Route path="/login" element={<Login user={props.user} setUser={props.setUser} />} />
            {/* <Route path="/login" element={<Login/>} /> */}
            <Route path="/signup" element={<Signup/>} />

        </Routes>
    );
}

export default AppRoutes;