import { login } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { useLogin } from '../context/UserContext'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

export const LoginForm = () => {

    const navigate = useNavigate()
    const { login:loginUser } = useLogin()
    const [ apiErrors, setApiErrors ] = useState({})

    const handleSubmit = e => {
        e.preventDefault()
        const { userName, password } = e.target
        login( { userName: userName.value, password: password.value } )
            .then( ()=> {
                loginUser()
                toast.success("Login successful!")
                navigate('/')  
            } )
            .catch( error => {
                console.log("login error:", error)
                setApiErrors(prev => ({...prev, loginRequest: "Unable to login."}))
                toast.error("Unable to login.")
            })
    }

    return(
        <div className="backgroundLayout items-center flex flex-col">

            <div className="w-1/2">
                <p className="text-center text-xl font-bold mb-8">
                    Welcome to the Closet Organizer app! Don't have an account yet?
                    Click the Register button above to sign up.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="border-2 border-brandNavy bg-brandBlue text-brandNavy p-10 rounded">
                <p className="text-center text-4xl mb-8 text-white">Login</p>

                <div className="mb-5">
                    <label htmlFor="userName" className="text-white">User Name:</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            required
                            autoComplete="username"
                        />
                </div>

                <div className="mb-8">
                    <label htmlFor="password" className="text-white">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            autoComplete="current-password"
                        />
                </div>

                {apiErrors.loginRequest && <p className="text-red-500 text-center mb-5">{apiErrors.loginRequest}</p>}
                <div className="flex justify-center w-full">
                    <button type="submit">Login</button>
                </div>

            </form>

        </div>
    )
}