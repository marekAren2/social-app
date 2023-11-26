import { useState } from "react";
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // loginMessages, setLoginMess 23:49
  //axios
  //error if(Array.isArray(res.data.username) tst na tablicowosc
  // setLoginMes()
  //26:56 else
  //props.setitem bledy logowania

  //33:29 axios authorization Bearer + (user ?.jwt_token: "" )

  return (
    <div className="login">
      <form className="formLogin">
        {/* //{}loginMessages */}
        <input
          type="text"
          className="username"
          placeholder="User name"
          value={formData.username}
          name="username"
        />
        <input
          type="password"
          className="password"
          placeholder="Password"
          value={formData.password}
          name="password"
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
