import { useState } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
/* import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup'; */



function App() {

// 18:04 skorzystac z tego uzytkownika i trzymac w stanie tego Component
// const [user, setUser] = useState(null);
//22:08 obiekt jak body getItem('') w cudzyslow  JSON.parse() <-na json JSON.stringify()->na string
const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
//18:36 now null ostatecznie pojawi sie cos innego

  // 18:25 user setUser
  //22:17 przy starcie pobieram z localStorage w f12/aplikacja
  return (
    <div className="App" >
      {/* //dlaczego Appnav przed AppRoutes? */}
      <AppNav/>
      {/* // 18:46 przez props przepuszczam do Component AppRoutes setter funkcje referencje*/}
      {/* <AppRoutes/>  */}
      <AppRoutes setUser={setUser}/> 
      {/* //do routes przepuszczam */}
    </div>
  );
}

export default App;
    {/* <Home/>;
      <Login/>;
      <Signup/>; */}
