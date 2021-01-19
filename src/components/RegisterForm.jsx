import React from "react";
import '../App.css'

export default function RegisterForm({handleRegister = f => f}) {


    const [credentials, setCredentials] = React.useState({})
    const [errors, setErrors] = React.useState({})


    const submit = (event) => {
        event.preventDefault()
        if (validate("", credentials, true)) {
            handleRegister(credentials)
            alert("Zarejestrowano!")
        }
    }

    const handleChange = (event) => {
        let input = {...credentials};
        if (event.target.type === "checkbox") {
            input[event.target.name] = !input[event.target.name]
        } else {
            input[event.target.name] = event.target.value;
        }
        validate(event.target.name, input, false)
    }

    const validate = (fieldName, inp, all) => {
        let input = {...inp}
        let err = true;
        let errs = {...errors}
        delete errs["message"]
        if (fieldName === "name" || all) {
            if (!input["name"]) {
                errs["name"] = "Musisz podać imię"
                err = false
            } else {
                delete errs["name"]
            }
        }
        if (fieldName === "surname" || all) {
            if (!input["surname"]) {
                errs["surname"] = "Musisz podać nazwisko"
                err = false
            } else {
                delete errs["surname"]
            }
        }
        if (fieldName === "email" || all) {
            if (!input["email"]) {
                errs["email"] = "Musisz podać nazwisko"
                err = false
            } else {
                let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
                if (!pattern.test(input["email"])) {
                    errs["email"] = "podałes nieprawidlowy email"
                    err = false
                } else {
                    delete errs["email"]
                }
            }     
        }
        if (fieldName === "password" || all) {
            if (!input["password"]) {
                errs["password"] = "Musisz podać hasło"
                err = false
            } else {
                let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                if (!pattern.test(input["password"])) {
                    errs["password"] = "podałes za słabe hasło"
                    err = false
                } else {
                    delete errs["password"]
                }
            }     
        }
        if (fieldName === "birthdate" || all) {
            if (!input["birthdate"]) {
                errs["birthdate"] = "musisz podać date urodzenia"
                err = false
            } else {
                let userDate = new Date(input["birthdate"])
                let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
                let dob = userDate.getFullYear() * 10000 + userDate.getMonth() * 100 + userDate.getDay() * 1; // Coerces strings to integers

                if (now - dob < 180000) {
                    errs["birthdate"] = "musisz mieć 18 lat"
                    err = false
                } else {
                    delete errs["birthdate"]
                }
            }
        }
        if (fieldName === "agreement" || all) {
            if (!input["agreement"]) {
                errs["agreement"] = "musisz wyrazić zgode"
                err = false
            } else {
                delete errs["agreement"]
            }
        }
        if(!err) errs["message"] = "Musisz poprawić błędy!"
        setErrors(errs)
        setCredentials(input)
        return err
    }

    const reset = () => {
        setCredentials({
            name: "",
            surname: "",
            email: "",
            password: "",
            birthdate: "",
            agreement: false,
            image: ""
        })
        setErrors({})
    }

    return (
        <form onSubmit={submit}>
            <label>Imie:</label>
            <input value={credentials.name} type="text" name="name" onChange={handleChange}/><br/>
            <div className="err">{errors.name}</div> 

            <label>Nazwisko:</label>
            <input value={credentials.surname} type="text" name="surname" onChange={handleChange}/><br/>
            <div className="err">{errors.surname}</div> 

            <label>Email:</label>
            <input value={credentials.email} name="email" type="text" onChange={handleChange}/><br/>
            <div className="err">{errors.email}</div>

            <label>Hasło:</label>
            <input value={credentials.password} name="password" type="password" onChange={handleChange}/><br/>
            <div className="err">{errors.password}</div> 

            <label>Zdjęcie:</label>
            <input type="file" accept="image/*" name="image" onChange={handleChange}/>
            <div className="err">{errors.photo}</div> 

            <label>Data urodzenia:</label>
            <input value={credentials.birthdate} name="birthdate" type="date" onChange={handleChange}/><br/>
            <div className="err">{errors.birthdate}</div>

            <label>Ważna zgoda:</label>
            <input type="checkbox" checked={credentials.agreement} name="agreement" onChange={handleChange}/><br/>
            <div className="err">{errors.agreement}</div> 

            <button type="button"  onClick={() => reset()}>Reset</button>
            <input type="submit" value="Rejestruj"/>
            <div className="err">{errors.message}</div>  
        </form>
    );
}