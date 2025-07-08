import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllClothingItems } from "../services/clothingItem.service"
import { useLogin } from "../context/UserContext"
import { Link } from "react-router-dom"

export const Home = () => {

    const [clothingItems, setClothingItems] = useState([])
    const [loading, setLoading] = useState({clothingItems: "Loading clothing items..."})
    const [apiErrors, setApiErrors] = useState({})
    const { isLoggedIn } = useLogin()
    const navigate = useNavigate()

    const topItems = clothingItems.filter(({ category }) => category === 'tops')
    const bottomItems = clothingItems.filter(({ category }) => category === 'bottoms')
    const dressItems = clothingItems.filter(({ category }) => category === 'dresses')
    const footwearItems = clothingItems.filter(({ category }) => category === 'footwear')

    useEffect(() => {
        if( !isLoggedIn ){
            navigate('/login')
        } else {
            getAllClothingItems()
                .then(res => {
                    setClothingItems(res)
                })
                .catch(error => {
                    console.log("getAllCLothingItems error:", error)
                    setApiErrors(prev => ({...prev, getRequest: "Unable to load clothing items."}))
                    toast.error("Unable to load clothing items.")
                })
                .finally(() => setLoading(prev => ({...prev, clothingItems: false})))
        }
    }, [])

    return (
        <div className="flex">

            {loading.clothingItems && <p className="text-center">{loading.clothingItems}</p>}
            {apiErrors.getRequest &&
                <p className="text-red-500 text-center">
                    {apiErrors.getRequest}
                </p>
            }

            <div className="h-200 overflow-y-auto mx-auto max-w-3xs px-4 py-16 sm:px-6 sm:py-24 lg:max-w-2xs lg:px-8">
                <h2 className="text-center text-3xl mb-6">Tops</h2>
                <div className="flex flex-col columns- space-y-10">
                    {topItems.map(({ name, image, _id }) => (
                        <Link to={`/clothingItem/details/${_id}`} key={_id}>
                            <img
                                src={image}
                                className="rounded-lg bg-gray-200 object-cover group-hover:opacity-75 h-64 w-xs"
                                alt={name}
                            />
                            <h3 className="mt-4 text-lg text-gray-700">{name}</h3>
                        </Link>
                    ))}           
                </div>
            </div>

            <div className="h-200 overflow-y-auto mx-auto max-w-3xs px-4 py-16 sm:px-6 sm:py-24 lg:max-w-2xs lg:px-8">
                <h2 className="text-center text-3xl mb-6">Bottoms</h2>
                <div className="flex flex-col space-y-10 h-full max-h-32">
                    {bottomItems.map(({ name, image, _id }) => (
                        <Link to={`/clothingItem/details/${_id}`} key={_id}>
                            <img
                                src={image}
                                className="rounded-lg bg-gray-200 object-cover group-hover:opacity-75 h-64 w-xs"
                                alt={name}
                            />
                            <h3 className="mt-4 text-lg text-gray-700">{name}</h3>
                        </Link>
                    ))}           
                </div>
            </div>

            <div className="h-200 overflow-y-auto mx-auto max-w-3xs px-4 py-16 sm:px-6 sm:py-24 lg:max-w-2xs lg:px-8">
                <h2 className="text-center text-3xl mb-6">Dresses</h2>
                <div className="flex flex-col columns- space-y-10">
                    {dressItems.map(({ name, image, _id }) => (
                        <Link to={`/clothingItem/details/${_id}`} key={_id}>
                            <img
                                src={image}
                                className="rounded-lg bg-gray-200 object-cover group-hover:opacity-75 h-64 w-xs"
                                alt={name}
                            />
                            <h3 className="mt-4 text-lg text-gray-700">{name}</h3>
                        </Link>
                    ))}           
                </div>
            </div>

            <div className="h-200 overflow-y-auto mx-auto max-w-3xs px-4 py-16 sm:px-6 sm:py-24 lg:max-w-2xs lg:px-8">
                <h2 className="text-center text-3xl mb-6">Footwear</h2>
                <div className="flex flex-col columns- space-y-10">
                    {footwearItems.map(({ name, image, _id }) => (
                        <Link to={`/clothingItem/details/${_id}`} key={_id}>
                            <img
                                src={image}
                                className="rounded-lg bg-gray-200 object-cover group-hover:opacity-75 h-64 w-xs"
                                alt={name}
                            />
                            <h3 className="mt-4 text-lg text-gray-700">{name}</h3>
                        </Link>
                    ))}           
                </div>
            </div>

        </div>
    )
}