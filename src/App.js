import { useState } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
import axios from 'axios';
/* import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup'; */



function App() {

  // 18:04 skorzystac z tego uzytkownika i trzymac w stanie tego Component
  // const [user, setUser] = useState(null);
  //22:08 obiekt jak body getItem('') w cudzyslow  JSON.parse() <-na json JSON.stringify()->na string
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  //18:36 now null ostatecznie pojawi sie cos innego
  // < 34:05 powtorz jeszcze raz podpowiedzi z UI podpowiedz Authorization ;wyjasnij zapis and error
  // dopiero po tym zapisie 0:35 28.11 home one w menu now ,disappear pozostale menu .kiedy wpisywalem warunki sprawdz what don't work teraz sie refresh !!! cos tu nie gra 
  axios.defaults.headers.common['Authorization'] = "Bearer " + (user ? user.jwt_token : "")
  // 18:25 user setUser
  //22:17 przy starcie pobieram z localStorage w f12/aplikacja
  return (
    <div className="App" >
      {/* //dlaczego Appnav przed AppRoutes? */}
      {/* //31: przekazuje user (if true) do nav */}
      {/* // v27 02:33 przekazuje setUser do AppNav */}
      <AppNav setUser={setUser} user={user} />
      {/* // 18:46 przez props przepuszczam do Component AppRoutes setter funkcje referencje*/}
      {/* <AppRoutes/>  */}
        {/* // 28:49 App: przekazuje obiekt user chce wiedziec czy istnieje */}
      <AppRoutes user={user} setUser={setUser}/>   
      {/* //do routes przepuszczam */}
    </div>
  );
}

export default App;
    {/* <Home/>;
      <Login/>;
      <Signup/>; */}
