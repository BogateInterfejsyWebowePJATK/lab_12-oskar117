import React from "react";
import '../App.css'

export default function LoginForm({usersData, onLogin = f => f}) {

    const [logged, setLogged] = React.useState(false)

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = React.useState({
        email: '',
        password: '',
        message: ''
    })

    const submit = (event) => {
        event.preventDefault()
        let u = validate()
        if(u !== false) {
            setLogged(true)
            onLogin(u)
        }
    }

    const validate = () => {
        let errs = {}

        if (!credentials["email"]) {
            errs["email"] = "Podaj email"
        }

        if (!credentials["password"]) {
            errs["password"] = "Podaj hasło."
        }
    
        if (typeof credentials["email"] !== undefined) {
        
          let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
          if (!pattern.test(credentials["email"])) {
            errs["email"] = "podałes nieprawidlowy email"
          }
        }
        
        if (Object.keys(errs).length === 0 && errs.constructor === Object) {
            for(const u of usersData) {
                if (credentials["email"] === u.email && credentials["password"] === u.password) {
                    return u
                }
            }
            errs["message"] = "niepoprawne dane logowanie"
        }

        setErrors(errs);
        return false

    } 

    const handleChange = (event) => {
        setErrors({})
        setLogged(false)
        let input = {...credentials};
        input[event.target.name] = event.target.value;
        setCredentials(input);
      }

    return (
        <form onSubmit={submit}>
            <label>Email:</label>
            <input value={credentials.email} name="email" id="email" type="text" onChange={handleChange}/><br/>
            <div className="err">{errors.email}</div>
            <label>Hasło:</label>
            <input value={credentials.password} name="password" id="password" type="password" onChange={handleChange}/><br/>
            <div className="err">{errors.password}</div>    
            <input type="submit" value="Loguj"/>
            <div className="err">{errors.message}</div>  
            {logged && <div className="success">Zalogowano pomyślnie</div>}
        </form>
    );
}