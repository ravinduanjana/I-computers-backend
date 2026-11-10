import mongoose from "mongoose";

const productSchema = new mongoose.Schema(

    {
        productId : {
            type : String,
            required : true
        },

        name : {
            type : String,
            required : true
        },

        description : {
            type : String,
            required : true
        },


        AltName : {
            type : [String], //kotu  vrahan demme meka string array ekak, alternative names walin userta product eka search krna one nisa, ona namak ho kipayak mekata danna one 
            default : []
        },

        price : {
            type : Number,
            required : true
        },
        labledPrice : {
            type : Number  // labled price mean wedi mila kapala,  sell krana price eka pennana ekata 
        },

        category : {
            type : String,
            default : "other"  // default eken wenne category ekak dunne nethoth other kiyla aotoma fill weno, altname ekethehemai
        },
        images : {
            type : [String],
            default : ["images/default-product-1.png","/images/default-product-2.png"]

        },
        // ona products visible kranna ho in visible krnna use krai FALSE DEMMOTH adminta witrak pennawai true demmoth customer admin dennatma penwai
        isVisible : {
            type : Boolean,
            required : true,
            default : true
        },

        brand : {
            type : String,
            default : "generic"


        },

        model : {
            type : String,
            default : "standard"

        }
        

    }


)


const Product = mongoose.model("Product",productSchema) // product modele eka heduwa, export karagtha

export default Product;






