import { Navigate } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
// v212 3:32 props user z AppRoutes
const Signup = (props) => {
    // 08:31 kopiuje stan z Login.js plus dodaje new pola :
    // pamietaj usunac koncowke zeby podpowiedział import
    const [formData, setFormData] = useState ({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // 11:22 stan dla błedow
    const [errors, setErrors] = useState ({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    // console.log("🚀 ~ file: Signup.js:22 ~ Signup ~ errors:", errors)

// 14:40
    const validate = () => {
        let validationErrors = {
        username: false,
        email: false,
        password: false,
        confirmPassword: false
        };
        /* Username */
        // 22:05 dodaje trim : obetnie białe z przodu i tylu
        if (formData.username.trim().length < 4) {
            // 15:40 ustawiam status bledu
            validationErrors.username=true;
            // 15:46 ustawiam komunikat dla stanu errors ale na jednym polu username:
            //16:00 zwracamy nowy obiekt kopie wczesniejszego 
            //(...)skopiuj wszystkie pola do nowego, ale jedno pole username nadpisz wartoscia 
            setErrors(prevErrors=>{
                return {...prevErrors, 
                    username: "Username should have at least 4 characters"
                }
            })
            // console.log("🚀 ~ file: Signup.js:22 ~ Signup ~ errors:", errors)
            //21:50 czy w stringu jest pusty znak? 
            // oraz trim obciecie omyłkowych białych znakow z przodu i tylu
            // w warunku jest zaprzeczenie wyrazenia z specyfikacji
        } else if(!/^[^\s]*$/.test(formData.username.trim())) {
                // 22:27 kopiuje setter z powyzej:
                validationErrors.username=true;
                setErrors(prevErrors=>{
                    return {...prevErrors, 
                        username: "Username shouldn't have empty string"
                    }
                }) 
            
        } else {
            // jak nie ma błedow powyzej to false => brak bledow 
            validationErrors.username=false;
            setErrors(prevErrors=>{
                return {...prevErrors, 
                    username: ""
                }
            })
        }

        /* Email */
        
        // 26:10 wyrazenie regularne zaprzeczenie (!regexp) jesli nie jest mailem
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email=true;
            setErrors(prevErrors=>{
                return {...prevErrors, 
                    email: "There is no valid email"
                }
            })
        }   // 26:20 kopiuj zakonczenie z username jak nie ma bledow wyczysc pole errors
            // setterem 
            else {
            // jak nie ma błedow powyzej to false => brak bledow 
            // 26:26 oczywiscie zmien pola !!!uwaga,dokładnosc
            validationErrors.email=false;
            setErrors(prevErrors=>{
                return {...prevErrors, 
                    email: ""
                }
            })
        }

        /* Password */

            // 28:19 kopiuj z username: zmien at least 4 na 6 ,username na password
        if (formData.password.trim().length < 6) {
            validationErrors.password=true;
            setErrors(prevErrors=>{
                return {...prevErrors, 
                    password: "Password should have at least 6 characters"
                }
            }) 
        }  // 28:50 (dla pustych znakow bialych w srodku )skopiowane zmien pola username na password
            else if(!/^[^\s]*$/.test(formData.password.trim())) {
            // 22:27 kopiuje setter z powyzej:
            validationErrors.password=true;
            setErrors(prevErrors=>{
                return {...prevErrors, 
                    password: "Password shouldn't have empty string"
                }
            }) 
        }  // 29:43 czyli czy nie ma: !(regexp: czy jest znak specjalny)
            // 3.12 23:37 a string kto poda do parametru?
            else if(!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
                // 29:43 skopiowane z "Password should have at least 6 characters"
                validationErrors.password=true;
                setErrors(prevErrors=>{
                    return {...prevErrors, 
                        password: "Password must contain one of special charts np: ! # @ $ % "
                    }
                })
                
        }  // wszystko jest ok bez bledow to czyscimy
            else {
            // 28:19 jesli nie ma bledu kopiuj powyzej 
            // true na false : validationErrors.password=false;
            validationErrors.password=false;
            setErrors(prevErrors=>{
                return {...prevErrors, 
                    // czyscimy komunikat bo ok
                    password: ""
                }
            }) 
        }
        
        
        // 17:23 funkcja bedzie zwracała 'true' jesli choc jedno pole z 4-ch bedzie true
        // 18:11 zwracamy odwrotnosc username:true czyli false 
        // 23:59 wszystkie musza byc spełnione zeby wyslac: brak bledu w kazdym z 4-ech
        // iloczyn logiczny &&
        // 24:38 opis wytłumaczenie
        return (!validationErrors.username 
            && !validationErrors.email
            && !validationErrors.password
            && !validationErrors.confirmPassword)
    }
    // debugger;
    // console.log("🚀 ~ file: Signup.js:14 ~ Signup ~ formData:", formData)


    const handleInputChange = (e) => {
        console.log(e.target); 
        console.log(e.target.value); 
         //zawiera referencje do obiektu na ktorym zostala wywolana
        const target = e.target;
        const name = target.name
        
        // 10:41 spread syntax? robi kopie do obiektu wszystkich pol(name:'',pass:''),
        // mozemy nadpisac pole albo dodac
        setFormData({
          ...formData,
          //dynamiczne nadpisanie uzaleznione od name gdzie f.handle.. wywolana
          //co znaczy nawias kwadratowy?
          [name]: target.value, 
        });
    };
    // console.log("🚀 ~ file: Signup.js:14 ~ Signup ~ formData:", formData)
    // 11:51 obsługa obSubmit formularza
    const handleSubmit = (e) => {
        e.preventDefault();
        // 18:26 warunek po validate()- jesli zwroci false 
        // czyli validate()=false a po odwroceniu :!validate()=prawde 
        // to zakoncz wyjdz z funkcji
        if (!validate()) {
            return console.log('blad nie wysyłam');
        }

        console.log('wysyłam');
    }
return ( 
        // do 2:56 wczesniej opis w return jest render strony
        <div className="signUp">
            {/* // 3:28 jesli user zalogowany ma nas przenosic na głowna motyw jak z login */}
            {/* //  this option doesn't allow me to login */}
            {/* // zaimportował sie komponent wbudowany */}
            {props.user && <Navigate to="/"/>}
            <h2>Signup</h2>
            <form className="signUpForm"
            onSubmit={handleSubmit}>
                {/* {{debugger}} */}
                {/* // 19:53 blad jak obiekt w srodku? */}
                {/* <h3>[{errors}]</h3> */}
                
                <input type="text" name="username" placeholder="User name" 
                onChange={handleInputChange}/>
                {errors.username && <p>{errors.username}</p>}
                <input type="email" name="email" placeholder="Email" 
                onChange={handleInputChange}/>
                {errors.email && <p>{errors.email}</p>}
                <input type="password" name="password" placeholder="Password" 
                onChange={handleInputChange}/>
                {/* // 28:19 kopiuj zmien na password */}
                {errors.password && <p>{errors.password}</p>}
                <input type="password" name="confirmPassword" placeholder="Confirm password" 
                onChange={handleInputChange}/>
                <button className="btn">Sign Up</button>
            </form>
        </div>
    )
}
export default Signup
