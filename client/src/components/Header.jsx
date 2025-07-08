import { Link, useLocation } from 'react-router-dom'
import { useLogin } from '../context/UserContext'
import { logout } from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import closetOrganizerIcon from '../assets/closetOrganizerIcon.png'
import { toast } from "react-toastify"

export const Header = ({headerInfo}) => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout } = useLogin()
    const {pathname} = useLocation()

    let headerText
    let route
    let linkText

    if (pathname == "/") { // Homepage header
        headerText = "Closet Organizer"
        route = "/clothingItem/add"
        linkText = "Add Clothing Item to Closet"
    }
    else if (pathname == "/clothingItem/add") { // Create a Clothing Item header
        headerText = "Add Clothing Item"
        route = "/"
        linkText = "View Closet"
    }
    else if (pathname.startsWith("/clothingItem/update")) { // Update Clothing Item header
        headerText = `Update Your ${headerInfo.name}`
        route = `/clothingItem/details/${headerInfo._id}`
        linkText = "View Clothing Item"
    }
    else if (pathname.startsWith("/clothingItem/details")){
        headerText = `${headerInfo.name} Details` // Clothing Item Details header
        route = "/"
        linkText = "View Closet"
    }
    else { // Login and Register header
        headerText = "Closet Organizer"
    }

    // Logout button
    const handleLogout = async () => {
        try{
            await logout()
            userLogout()
            toast.success("Logout successful!")
            navigate('/login')
        } catch( error ){ 
            console.error('Logout Failed:', error)
            toast.error("Unable to logout.")
        }
    }

    return (
        <div className="flex justify-between items-center w-screen bg-brandMauve h-[17vh] p-3 border-2">

            <div className="flex items-center justify-between h-full">
                <Link to={"/"} className="h-full bg-transparent border-none p-0 shadow-none">
                    <img src={closetOrganizerIcon} alt="clothing-item-icon" className="h-full"/>
                </Link>
                <h1 className="text-5xl text-white tracking-wide ml-10">{headerText}</h1>
            </div>

            {
                isLoggedIn ?
                    <div className="flex h-full justify-between items-center">
                            <Link to={route} className="mr-10">{linkText}</Link>
                            <button onClick={handleLogout}>Logout</button>
                    </div>
                :
                    <div className="flex h-full justify-between items-center">
                        <Link to={'/login'} className="mr-10">Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
            }

        </div>
    )
}