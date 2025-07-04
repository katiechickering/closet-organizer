import { login } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { useLogin } from '../context/UserContext'
import { useState } from "react"

export const LoginForm = () => {
    const navigate = useNavigate()
    const { login:loginUser, isLoggedIn } = useLogin()
    const [ error, setError ] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const { userName, password } = e.target
        login( { userName: userName.value, password: password.value } )
            .then( ()=> {
                loginUser()
                navigate('/')  
            } )
            .catch( error => setError( error ) )
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login:</h2>
            <label>
                User Name:
                <input 
                    type="text" 
                    name="userName" 
                />
            </label>
            <label>
                Password:
                <input 
                    type="password" 
                    name="password" 
                />
            </label>
            { error && <p>{error}</p>}
            <input type="submit" value="Login" />
        </form>
    )
}