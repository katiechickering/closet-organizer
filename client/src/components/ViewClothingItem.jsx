import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useLogin } from '../context/UserContext'
import { deleteClothingItemById, getClothingItemById } from "../services/clothingItem.service"



export const ViewClothingItem = ({ setHeaderInfo }) => {
    const { id } = useParams()
    const [clothingItem, setClothingItem] = useState({})
    const [loading, setLoading] = useState({clothingItem: "Loading clothing item..."})
    const [apiErrors, setApiErrors] = useState({})
    const { isLoggedIn } = useLogin()
    const navigate = useNavigate()

    useEffect(() => {
        if( !isLoggedIn ){
            navigate('/login')
        } else {
            getClothingItemById(id)
                .then(res =>{ 
                    setClothingItem(res)
                    setHeaderInfo(res)
                })
                .catch(error => {
                    console.log("getCLothingItemById error:", error)
                    setApiErrors(prev => ({...prev, getRequest: "Unable to load clothing item."}))
                    toast.error("Unable to load clothing item.")
                })
                .finally(() => setLoading(prev => ({...prev, clothingItem: false})))
        }
    }, [id])

    const deleteClothingItem = () => {
        deleteClothingItemById(id)
            .then(res => {
                toast.success("Clothing item deleted successfully!")
                navigate("/")
            })
            .catch(error => {
                console.log("deleteClothingItemById error:", error)
                setApiErrors(prev => ({...prev, deleteRequest: "Unable to delete clothing item."}))
                toast.error("Unable to delete reservation.")
            })
    }

    return (
        <div className="backgroundLayout">

            {loading.clothingItem && <p className="text-center">{loading.clothingItem}</p>}
            {apiErrors.getRequest &&
                <p className="text-red-500 text-center">
                    {apiErrors.getRequest}
                </p>
            }

            <div className="flex justify-center lg:flex-row gap-20">

                <div className="bg-white w-2xl my-10 h-125 border-2 border-gray-600 rounded-lg flex items-center justify-center">
                    <img className="h-123 m-w-2xl" src={clothingItem.image} alt={clothingItem.name} />
                </div>

                <div className="flex flex-col justify-center items-center text-2xl leading-relaxed text-center w-2xl my-10 h-125 border-2 border-gray-600 p-4 rounded-md bg-brandBlue text-white">
                    <div className="flex space-x-2">
                        <p className="font-bold">Name: </p><p> {clothingItem.name}</p>
                    </div>
                    <div className="flex space-x-2">
                        <p className="font-bold">Category: </p><p> {clothingItem.category}</p>
                    </div>
                    <div className="flex space-x-2">
                        <p className="font-bold">Size: </p> <p>{clothingItem.size}</p>
                    </div>
                    <div className="flex space-x-2">
                        <p className="font-bold">Brand: </p> <p>{clothingItem.brand}</p>
                    </div>
                    <div className="flex space-x-2">
                        <p className="font-bold">Color: </p> <p><span className="border border-gray-400 inline-block h-6 w-25" 
                            style={{ backgroundColor: clothingItem.color }}></span>
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <p className="font-bold">Style: </p><p>{clothingItem.style}</p>
                    </div>
                </div>

            </div>

            {apiErrors.deleteRequest && <p className="text-red-500 text-center">{apiErrors.deleteRequest}</p>}
            <div className="m-10 flex justify-center gap-4">
                <Link to={`/clothingItem/update/${id}`} className="m-1 px-4 py-2 text-white bg-brandMauve rounded shadow hover:bg-brandNavy">Update Item</Link>
                <button className="m-1 px-4 py-2 bg-brandMauve text-white rounded shadow hover:bg-red-700" onClick={deleteClothingItem}>Delete Item</button>
            </div>  

        </div>
    )
}