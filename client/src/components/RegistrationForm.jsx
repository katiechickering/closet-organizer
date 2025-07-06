import { useNavigate } from 'react-router-dom'
import { register } from '../services/user.service'
import { useState } from 'react'
import { useLogin } from '../context/UserContext'
import { toast } from "react-toastify"

const DEFAULT_FORM_VALUES = {
    userName: "",
    password: "",
    confirmPassword: ""
}

export const RegistrationForm = () => {
    const navigate = useNavigate()
    const { login } = useLogin()
    const [ dataErrors, setDataErrors ] = useState({})
    const [formData, setFormData] = useState(DEFAULT_FORM_VALUES)
    const [formErrors, setFormErrors] = useState({})

    // Dynamically set form data
    const handleChange = e => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
        validateData(name, value)
    }

    // Validate form inputs dynamically
    const validateData = (name, value) => {
        const validations = {
            userName: () => false,
            password: value => {
                if (value.length < 8) return "Passwords must be at least eight characters long."
                else if (value != formData.confirmPassword) return "Passwords must match."
                else {
                    setFormErrors(prev => ({...prev, confirmPassword: false}))
                    return false
                }
            },
            confirmPassword: value => {
                if (value.length < 8) return "Passwords must be at least eight characters long."
                else if (value != formData.password) return "Passwords must match."
                else {
                    setFormErrors(prev => ({...prev, password: false}))
                    return false
                }
            }
        }
        setFormErrors(prev => ({...prev, [name]: validations[name](value)}))
    }

    // Check for errors before submitting form
    const isReadyToSubmit = () => {
        for (let key in formErrors){
            if (formErrors[key] != false) {
                return false
            }
        }
        return true
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()
        if (!isReadyToSubmit()){
            toast.error("Please make corrections to the form.")
        }
        else {
            let { userName, password, confirmPassword } = e.target
            userName = userName.value 
            confirmPassword = confirmPassword.value 
            password = password.value 
            register({userName, password, confirmPassword})
                .then( ()=>{ 
                    login()
                    toast.success("Account created successfully!")
                    navigate('/') 
                })
                .catch( error => {
                    console.log("registerAccount error:", error)
                    setDataErrors(prev => ({...prev, createRequest: "Unable to create account."}))
                    toast.error("Unable to create account.")
                }
            )
        }
    }

    return(
        <div className="backgroundLayout items-center flex flex-col">

            <form onSubmit={handleSubmit} className="border-2 border-brandNavy bg-brandBlue text-brandNavy p-10">
                <p className="text-center text-4xl mb-8 text-white">Register</p>

                <div className="mb-5">
                    <label htmlFor="usertName" className="text-white">User Name:</label>
                        <input
                            type="text"
                            value={formData.userName}
                            onChange={handleChange}
                            name="userName"
                            id="userName"
                            required
                        />
                </div>

                <div className="mb-5">
                    {formErrors.password && <p className="text-red-500 text-center">{formErrors.password}</p>}
                    <label htmlFor="password" className="text-white">Password:</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            id="password"
                            required
                            className={formErrors.confirmPassword ? "error" : ""}
                        />
                </div>

                <div className="mb-8">
                    {formErrors.confirmPassword && <p className="text-red-500 text-center">{formErrors.confirmPassword}</p>}
                    <label htmlFor="confirmPassword" className="text-white">Confirm Password:</label>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        className={formErrors.confirmPassword ? "error" : ""}
                    />
                </div>

                {dataErrors.createRequest &&
                    <p className="text-red-500 text-center">
                        {dataErrors.createRequest}
                    </p>
                }

                <div className="flex justify-center w-full">
                    <button type="submit">Register</button>
                </div>

            </form>
        </div>
    )
}