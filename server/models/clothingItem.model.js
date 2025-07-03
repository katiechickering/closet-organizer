import { model, Schema } from 'mongoose'

const clothingItemSchema = new Schema(
    {
        name: {
            type : String,
            required: [true, "Name is required"],
            minLength: [3, 'Name must be 3 or more characters'],
            maxLength: [60, "Name cannot be more than 60 characters long"]
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: [ "Tops", "Bottoms", "Dresses", "Footwear"],
        },
        size: {
            type: String,
            required: [true, "Size is required"],
            minLength: [1, 'Size must be 1 or more characters'],
            maxLength: [20, "Size cannot be more than 20 characters long"]
        },
        brand: {
            type : String,
            required: [true, "Brand is required"],
            minLength: [2, 'Brand must be 2 or more characters'],
            maxLength: [30, "Brand cannot be more than 30 characters long"]
        },
        color: {
            type : String,
            required: [true, "Color is required"]
        },
        material: {
            type : String,
            required: [true, "Material is required"],
            minLength: [2, 'Material must be 2 or more characters'],
            maxLength: [30, "Material cannot be more than 30 characters long"]
        },
        style: {
            type: String,
            required: [true, "Style is required"],
            enum: [ "Casual", "Business", "Formal", "Sport"],
        },
        image: {
            type: String,
            required: [true, "Image is required."],
            validate: {
                validator: v => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v), 
                message: props => `${props.value} is not a valid URL.`
            }
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps : true }
)

const ClothingItem = model( 'ClothingItem', clothingItemSchema)
export default ClothingItem