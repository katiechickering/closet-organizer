import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useLogin } from '../context/UserContext'
import { createClothingItem, getClothingItemById, updateClothingItem } from "../services/clothingItem.service"

const DEFAULT_FORM_VALUES = {
    name: "",
    category: "",
    size: "",
    brand: "",
    color: "#ffffff",
    material: "",
    style: "",
    image: ""
}

const CATEGORY_ENUM = ["tops", "bottoms", "dresses", "footwear"]
const STYLE_ENUM = ["casual", "business", "formal", "sport"]

export const ClothingItemForm = ({setHeaderInfo}) => {

    const [formData, setFormData] = useState(DEFAULT_FORM_VALUES)
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState({clothingItem: "Loading clothing item details..."})
    const [dataErrors, setDataErrors] = useState({})
    const navigate = useNavigate()
    const {id} = useParams()
    const { isLoggedIn } = useLogin()

    // Load page as the create form or edit form based on the url
    useEffect(() => {
        // if( !isLoggedIn ){
        //     navigate('/login')
        // }
        if (id) {
            getClothingItemById(id)
            .then(res => {
                setFormData(res)
                setHeaderInfo(res)
            })
            .catch(error => {
                console.log("getClothingItemById error:", error)
                setDataErrors(prev => ({...prev, getRequest: "Unable to load clothing item details."}))
                toast.error("Unable to load clothing item details.")
            })
            .finally(() => setLoading(prev => ({...prev, clothingItem: false})))
        } else {
            setFormData(DEFAULT_FORM_VALUES)
            setLoading(prev => ({...prev, clothingItem: false}))
        }
    }, [id])

    // Dynamically set form data
    const handleChange = e => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
        validateData(name, value)
    }

    // Validate form inputs dynamically
    const validateData = (name, value) => {
        const validations = {
            name: value => (
                value.length < 3 ? "Name must be at least 3 characters."
                : value.length > 60 ? "Name must be no more than 60 characters."
                : false
            ),
            category: value => (
                !CATEGORY_ENUM.includes(value) ? "Category must be one of: tops, bottoms, dresses, footwear."
                : false
            ),
            size: value => (
                value.length < 1 ? "Size must be at least 1 character."
                : value.length > 20 ? "Size must be no more than 20 characters."
                : false
            ),
            brand: value => (
                value.length < 2 ? "Brand must be at least 2 characters."
                : value.length > 30 ? "Brand must be no more than 30 characters."
                : false
            ),
            color: () => false,
            material: value => (
                value.length < 2 ? "Material must be at least 2 characters."
                : value.length > 30 ? "Material must be no more than 30 characters."
                : false
            ),
            style: value => (
                !STYLE_ENUM.includes(value) ? "Style must be one of: casual, business, formal, sport."
                : false
            ),
            image: value => (
                !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value) ? `${value} is not a valid URL.`
                : false
            )
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
            return toast.error("Please make corrections to the form.")
        }
        else if (id) {
            updateClothingItem(formData)
            .then(() => {
                toast.success("Clothing item updated successfully!")
                navigate(`/clothingItem/details/${id}`)
            })
            .catch((error) => {
                console.log("updateClothingItem error:", error)
                setDataErrors(prev => ({...prev, updateRequest: "Unable to update clothing item."}))
                toast.error("Unable to update clothing item.")
            })
        }
        else {
            createClothingItem(formData)
            .then(res => {
                toast.success("Clothing item created successfully!")
                navigate("/")
            })
            .catch((error) => {
                console.log("createClothingItem error:", error)
                setDataErrors(prev => ({...prev, createRequest: "Unable to create clothing item."}))
                toast.error("Unable to create clothing item.")
            })
        }
    }

    return (
        <div className="backgroundLayout items-center flex flex-col">

            {/* Form */}
            <form onSubmit={handleSubmit} className="border-2 border-brandNavy bg-brandBlue text-brandNavy p-10 rounded">
                {loading.clothingItem && <p>{loading.clothingItem}</p>}
                {dataErrors.getRequest &&
                    <p className="text-red-500 text-center">
                        {dataErrors.getRequest}
                    </p>
                }

                <div className="mb-5">
                    <label htmlFor="name" className="text-white">Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        id="name"
                        required
                        className={formErrors.name ? "error" : ""}
                    />
                    {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="category" className="text-white">Category:</label>
                    <select
                        value={formData.category}
                        onChange={handleChange}
                        name="category"
                        id="category"
                        required
                        className={formErrors.category ? "error ml-2" : "ml-2"}
                    >
                        <option disabled value="">Select a Category</option>
                        <option value="tops">Tops</option>
                        <option value="bottoms">Bottoms</option>
                        <option value="dresses">Dresses</option>
                        <option value="footwear">Footwear</option>
                    </select>
                    {formErrors.category && <p className="text-red-500">{formErrors.category}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="size" className="text-white">Size:</label>
                    <input
                        type="text"
                        value={formData.size}
                        onChange={handleChange}
                        name="size"
                        id="size"
                        required
                        className={formErrors.size ? "error" : ""}
                    />
                    {formErrors.size && <p className="text-red-500">{formErrors.size}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="brand" className="text-white">Brand:</label>
                    <input
                        type="text"
                        value={formData.brand}
                        onChange={handleChange}
                        name="brand"
                        id="brand"
                        required
                        className={formErrors.brand ? "error" : ""}
                    />
                    {formErrors.brand && <p className="text-red-500">{formErrors.brand}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="color" className="text-white">Color:</label>
                    <input
                        type="color"
                        value={formData.color}
                        onChange={handleChange}
                        name="color"
                        id="color"
                        required
                        className={formErrors.color ? "error" : ""}
                    />
                    {formErrors.color && <p className="text-red-500">{formErrors.color}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="material" className="text-white">Material:</label>
                    <input
                        type="text"
                        value={formData.material}
                        onChange={handleChange}
                        name="material"
                        id="material"
                        required
                        className={formErrors.material ? "error" : ""}
                    />
                    {formErrors.material && <p className="text-red-500">{formErrors.material}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="style" className="text-white">Style:</label>
                    <select
                        value={formData.style}
                        onChange={handleChange}
                        name="style"
                        id="style"
                        required
                        className={formErrors.style ? "error ml-2" : "ml-2"}
                    >
                        <option disabled value="">Select a Style</option>
                        <option value="casual">Casual</option>
                        <option value="business">Business</option>
                        <option value="formal">Formal</option>
                        <option value="sport">Sport</option>
                    </select>
                    {formErrors.style && <p className="text-red-500">{formErrors.style}</p>}
                </div>

                <div className="mb-8">
                    <label htmlFor="image" className="text-white">Image URL:</label>
                    <input
                        type="text"
                        value={formData.image}
                        onChange={handleChange}
                        name="image"
                        id="image"
                        required
                        className={formErrors.image ? "error" : ""}
                    />
                    {formErrors.image && <p className="text-red-500">{formErrors.image}</p>}
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="bg-brandMauve text-white hover:bg-brandNavy">
                        {id ? `Update Clothing Item` : "Submit Clothing Item"}
                    </button>
                </div>

                {dataErrors.createRequest &&
                    <p className="text-red-500 text-center">
                        {dataErrors.createRequest}
                    </p>
                }
                {dataErrors.updateRequest &&
                    <p className="text-red-500 text-center">
                        {dataErrors.updateRequest}
                    </p>
                }

            </form>

        </div>
    )
}