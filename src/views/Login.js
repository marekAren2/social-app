import { useState } from "react";
import "./Login.css"
import axios from "axios";

// 19:27 wracam do component Login i ustawiam props
const Login = (props) => {
// const Login = () => {

    // 5:14 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    //7:46 brak .value
    console.log(e.target.value); 
    
    //zawiera referencje do obiektu na ktorym zostala wywolana
    const target = e.target;
    
    //10:15 w ktorym obiekcie opisanym name wywolane
    const name = target.name
    
    // 10:41 spread syntax? robi kopie do obiektu wszystkich pol(name:'',pass:''),
    // mozemy nadpisac pole albo dodac
    // ASK: v:2.6 12:24 opis aktualizacja stanow funkcji ODP: dopisz z napisow
    // DO: 12:41 uncomment value
    setFormData({
      ...formData,
      //dynamiczne nadpisanie uzaleznione od name gdzie f.handle.. wywolana
      //co znaczy nawias kwadratowy?
      [name]: target.value, 
    });
    // console.log("🚀 ~ file: Login.js:26 ~ handleInputChange ~ ...formData:", ...formData)
  };
   // 23:19 rozne obiekty ,stringi w stanie
   const [loginMessage, setLoginMessage] = useState('') ;
  // 13:17 obsluga submit send formularza 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 ~ file: Login.js:38 ~ handleSubmit ~ e.preventDefault():", e.preventDefault())
    console.log('submit');
    //axios copy from Home :ten czy wersja z concat
    axios
        // zmiana na login wczesniej ale widac 15:15
        // .post("http://akademia108.pl/api/social-app/post/latest")
        // dodaje body z user passwd
        // wczesniej 15:15 ASK: body wlasciwosc (prop) i wartosc (value) bez cudzyslow mozna tak nazywac?
        .post("http://akademia108.pl/api/social-app/user/login", {
          username: formData.username ,
          password: formData.password
        })
        .then((res)=>{
          // 24:53 test na tablice co to znaczy jak czytac
          console.log('res.data',res.data);
          
          if (Array.isArray(res.data.username)) {
           // 26: czemu z index[] tablicy ?
            setLoginMessage(res.data.username[0])
          } else if (Array.isArray(res.data.password)){
            setLoginMessage(res.data.password[0])
          } else if (Array.isArray(res.data.error)){
            setLoginMessage('incorrect username or password')
            //27:13
          } else
          props.setUser(res.data);  
            // 20:11 wstawianie do LocaStorage dokoncz opis
          // localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('user', JSON.stringify(res.data)); 
            //15:28 opis
            // 15:07 now (chwilowo) zamiast
          console.log(res.data);
            // 19:37 czary mary przekazywanie props - wstawic this user do stanu
            // DO: mam blad props.setUser is not a function!!
          // props.setUser(res.data);
            //23: obsluga błędów error
           //  setPosts(res.data)
          console.log('dostaje jwt_token');
        })
        .catch((error) => {
            console.warn(error);
        });
  }

  // loginMessages, setLoginMess 23:49
  //axios
  //error if(Array.isArray(res.data.username) test na tablice
  // setLoginMes()
  //26:56 else
  //props.setItem error logowania

  //33:29 axios authorization Bearer + (user ?.jwt_token: "" )

  return (
    <div className="login">
      
      {/* <form className="formLogin"  */}
      {/* // : when was change, zorientowałem sie w i change w 23:54 maybe now changes ? */}
      <form  onSubmit={handleSubmit} className="formLogin">
        {/* // 24:06  warunek dla h2 jesli jest loginMessage true czyli nie puste */}
        {loginMessage && <h2>{loginMessage}</h2>}
        <input
          type="text"
          className="username"
          placeholder="User name"
          // 6:13 wlasciwosc username: obiektu formData ustawiona przez setter w useState
          // value={formData.username}
          onChange={handleInputChange} 
          // value="user_test" po Zmianie(onChange) Cannot read properties of undefined (reading 'value')
          name="username"
          // 15:52
        />
        <input
          type="password"
          className="password"
          placeholder="Password"
            // 6:30 valu powinno byc odpowiadac stanowi stad
            //   value={formData.password}
            //   value="password_test"
          name="password"
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btnSubmitLogin"
        onClick={handleSubmit}
        >
          {" "}
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
// przed 12: myk z funkcja dla 2 poll [name]
