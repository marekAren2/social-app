import { useState } from "react";
import "./Login.css"

const Login = () => {

    // 5:14 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    //7:46 brak .value
    console.log(e.taget.value);
  }

  // loginMessages, setLoginMess 23:49
  //axios
  //error if(Array.isArray(res.data.username) tst na tablicowosc
  // setLoginMes()
  //26:56 else
  //props.setitem bledy logowania

  //33:29 axios authorization Bearer + (user ?.jwt_token: "" )

  return (
    <div className="login">
      <form className="formLogin" 
    // moja inwencja daje blad
    //   onChange={handleInputChange()}
      >
        {/* //{}loginMessages */}
        <input
          type="text"
          className="username"
          placeholder="User name"
        //6:13 wlasciwosc username: obiektu formData ustawiona przez setter w useState
          //   value={formData.username}
          name="username"
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="password"
          placeholder="Password"
        // 6:30 valu powinno byc odpowiadac stanowi stad
          //   value={formData.password}
          name="password"
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btnSubmitLogin">
          {" "}
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
// przed 12: myk z funkcja dla 2 poll [name]
