import { useState } from "react";

const Login = () => {
    
    const [formData, setFormData] = useState ({
        
        username: "",
        password: ""

    })
    
    // loginMessages, setLoginMess 23:49
    //axios
 //error if(Array.isArray(res.data.username) tst na tablicowosc
 // setLoginMes()
 //26:56 else
 //props.setitem bledy logowania

//33:29 axios authorization Bearer + (user ?.jwt_token: "" )

    return (
    <div className="login">
        <form >
            {/* //{}loginMessages */}
            <input type="text" className="login" placeholder="user" value={formData.username}/>
            <input type="password" className="password" placeholder="password" value={formData.password}/>
        </form>
    </div>
    )
}

export default Login;
// przed 12: myk z funkcja dla 2 poll [name]