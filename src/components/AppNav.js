import { Link } from "react-router-dom"
import  "./AppNav.css"
import axios from "axios";
// 31:16 props insert to parametr function
const AppNav = (props)  => {
    
    // v27 01:22 obsłuż wylogowanie
    const handleLogout = (e) => {
        e.preventDefault();

        // v27 02:01 kopiuje z Login.js
      axios
        // usuwam 2-gi parametr {obiekt user passwd zapytanie nie bedzie miało ciała body }
        // v27 04:52 nie dziala disappear nie zmieniłem koncowki http na logout
        .post("http://akademia108.pl/api/social-app/user/logout")
        // .post("http://akademia108.pl/api/social-app/user/login")
        .then((res)=>{
            // v27 03:19 dodaje warunek res.data.message
            console.log('res.data before if',res.data);
            if (res.data.message) {
                console.log('res.data after if',res.data);
                console.log("🚀 ~ file: AppNav.js:19 ~ .then ~ res.data.message:", res.data.message)
                // v27 02:59 po true logout set to null ustawiam null na user 
                // za pomoca setter'a po pozytywnym wylogowaniu
                props.setUser(null);  
                console.log("🚀 ~ file: AppNav.js:19 ~ .then ~ props.setUser:", props.setUser)
                // 04:09 user z JSON.stringify na null
                localStorage.setItem('user', null); 
                // v27 2:25 if remove warunki nie potrzebne z Login.js
            }
        })
        .catch((error) => {
            console.warn(error);
            // v27 04:23 po co czyscimy w przypadku bledu wylogowania localStorage?
            // v27 04:23 wstawiam z if
            // v27 04:23 ! error 'res' is not defined w .catch z axios
            // console.log('res.data after if', res.data);
            // console.log("🚀 ~ file: AppNav.js:19 ~ .then ~ res.data.message:", res.data.message)
            props.setUser(null);  
            console.log("🚀 ~ file: AppNav.js:19 ~ .then ~ props.setUser:", props.setUser)
            localStorage.setItem('user', null); 
        });
    } 
    
    return (
        <nav className="mainNav">
            <ul>  
                <li>
                    <Link to="/" >Home</Link>
                </li>
                {/* // 31:38 if user don't exist then render*/}
                {!props.user && <li>
                    <Link to="/login" >Login</Link>
                </li>}
            {/* //31:49 repeat:if user don't exist then render*/} 
                {/* // 32:10 don't work */}
                {!props.user && <li>
                    <Link to="/signup" >Signup</Link>
                </li>}
                {/* // v2.7 00:39 warunek odwrotny: kiedy user jest wylogowany */}
                {props.user && <li>
                    {/* // v27 04:37 add obsluga zdarzenia na linku */}
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                </li>}
            </ul>
        </nav>
    )
}

export default AppNav;
