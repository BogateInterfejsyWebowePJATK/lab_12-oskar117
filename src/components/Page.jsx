import React from "react";
import LoginForm from "./LoginForm";
import PostLogin from "./PostLogin";
import RegisterForm from "./RegisterForm";

export default function Page({userData}) {

    const [users, setUsers] = React.useState(userData) 
    const [logged, setLogged] = React.useState(false)
    const [register, setRegister] = React.useState(false)
    const [loggedUser, setLoggedUser] = React.useState()

    const handleRegister = (user) => {
        let u = [...users]
        u.push(user)
        setUsers(u)
        setRegister(false)
    }

    const handleLogin = (e) => {
        setLogged(true)
        setLoggedUser(e)
    }

    const handleLogout = () => {
        setLogged(false)
    }

    return (
        <>
            {logged ?
                <PostLogin user={loggedUser} logout={handleLogout} />
                :
                <>
                    {register ?
                        <RegisterForm handleRegister={handleRegister}/>
                        :
                        <>
                            <LoginForm usersData={users} onLogin={handleLogin}/>
                            <button onClick={() => setRegister(true)}>Register</button>
                        </>
                    }
                </>
            }

        </>
    );
}