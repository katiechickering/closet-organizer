import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useLogin } from '../context/UserContext'
import { deleteClothingItemById, getClothingItemById } from "../services/clothingItem.service"



export const ViewClothingItem = ({ setHeaderInfo }) => {
    const { id } = useParams()
    const [clothingItemData, setClothingItemData] = useState({})
    const { isLoggedIn } = useLogin()
    const navigate = useNavigate()

    useEffect(() => {
        getClothingItemById(id)
            .then(res =>{ 
                setClothingItemData(res)
                setHeaderInfo(res)
            })
            .catch(error => console.log("CLoset Organizer", error))
    }, [id])

    const deleteItem = id => {
            deleteClothingItemById(id)
                .then(res => {
                    setClothingItemData(prev => prev.filter(clothingItemData => clothingItemData.id != id))
                    navigate("/")})
                .catch(error => console.log("Closet Organizer", error))
        }

    return (
        <div>
            <div className="flex flex-col justify-center lg:flex-row gap-30 items-start">
                <div className="w-2xl my-10 h-125 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <img className="h-123 m-w-2xl" src={clothingItemData.image} alt={clothingItemData.name} />
                </div>
                <div className="items-center text-2xl leading-relaxed text-center w-2xl my-10 border h-125 border-gray-300 p-4 rounded-md">
                    <p><strong>Name:</strong> {clothingItemData.name}</p>
                    <p><strong>Category:</strong> {clothingItemData.category}</p>
                    <p><strong>Size:</strong> {clothingItemData.size}</p>
                    <p><strong>Brand:</strong> {clothingItemData.brand}</p>
                    <p><strong>Color:</strong> <div className="border border-gray-400 inline-block h-6 w-25" style={{ backgroundColor: clothingItemData.color }}></div></p>
                    <p><strong>Material:</strong> {clothingItemData.material}</p>
                    <p><strong>Style:</strong> {clothingItemData.style}</p>
                </div>
            </div>
            <div className="mt-10 flex justify-center gap-4">
                <Link to={`/clothingItem/update/${id}`} className="px-4 py-2 bg-gray-100 rounded shadow hover:bg-gray-200">Update Item</Link>
                <button className="px-4 py-2 bg-red-100 text-red-700 rounded shadow hover:bg-red-200" onClick={() => deleteItem(id)}>Delete Item</button>
            </div>
        </div>
    )
}