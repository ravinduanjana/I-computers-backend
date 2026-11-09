import { isAdmin } from "./usercontroller.js";
import Product from "../models/product.js";
import productRouter from "../routers/productRouter.js";



export async function createProduct(req,res){

   if (! isAdmin(req)){
        res.status(403).json({message : "access denied, only admins can create products"}); // ! is admin mean isAdmin function eke ena user adminta kenek newei nam adala message eka print krana.
        return;
   } 

try {

    const existingProducts = await Product.findOne({
        productId: req.body.productId //productID thibbe
    })

    if (existingProducts){
        res.status(400).json({message : "product with given productId already exists"})
       return;
          }
        
        const data = {}
        data.productId = req.body.productId;
        if (req.body.name == null){{
            res.status(400).json({message : "product name is required"})
            return;
        }}

        data.name = req.body.name; // uda data kiyla hadpu empty json ekata request eke ena data daganno.
        data.description = req.body.description ||"" // description eka awe nethoth product create kraddi || "" me wage null stringekak dano, e kiuwe description ekak awe nethoth arka dagnno empty kiyala
        data.AltName = req.body.AltName || [] // [] demme user models eketh [] dapu nisa. string array ekak nisa.
        if(req.body.price == null) {
            res.status(400).json({message : "product price is required"})
            return; // return danne methanin ehata me code eka run wnna be price eka nethuwa req eka awa nisa
        }
        data.price = req.body.price;
        data.labledPrice = req.body.labledPrice || req.body.price;
        data.category = req.body.category || "other"
        data.images= req.body.images || ["/image/default-product-1.png","/image/default-product-2.png"]
        data.isVisible= req.body.isVisible
        data.brand= req.body.brand ||"generic"
        data.model= req.body.model ||"standard";

        const newProduct = Product(data);
        await newProduct.save();
        res.status(201).json({message : "product ceated successfully", product : newProduct });


    }
catch(error){
    res.status(500).json({message : "error creating products", error : error})
}
}


export async function getProducts(req,res){
//isAdmin kiyala thiyena part eken wenne req eka ewnne admin keneknam okkoma products tika pennano adminta. else eke thiyenne isvisible tru wecha ewa withrak pennano.
try {
    if (isAdmin(req)){
    const products= await Product.find();// products tika product variable ekta dgenima
    res.status(200).json(products);// front end ekt yevima
    }  else {
            const product = await Product.find({isVisible:true});
            res.status(200).json(product);

    }


}catch(error){

    res.status(501).json({message : "error fetching products", error: error})
}


}


export async function deleteProduct(req,res){
    if (!isAdmin(req)){
        res.status(403).json({message: "access denied, admins only"});
        return;
    }

    try {
        const productId = req.params.productId; //productrouter eke req eke body eke ewn eka newei api ektma ewna nisa body
        //thibba eka wenas krno params(parameter kiyala)
        await Product .deleteOne({productId:productId});
        res.status(200).json({message: "product deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:"error deleting products", error:error})
    
    }
}
//product update krna ektath product create krna code ekma copy krgena
export async function updateProduct(req,res){
     if (! isAdmin(req)){
        res.status(403).json({message : "access denied, only admins can create products"}); // ! is admin mean isAdmin function eke ena user adminta kenek newei nam adala message eka print krana.
        return;
   } 

try {

    const productId = req.params.productId;
        
        const data = {}  //data kiyl empty json ekak heduwa ekta pahala data. kiya kiya eka eka update krnna ona values tida daganno.
    

        if (req.body.name == null){{
            res.status(400).json({message : "product name is required"})
            return;
        }}

        data.name = req.body.name; // uda data kiyla hadpu empty json ekata request eke ena data daganno.
        data.description = req.body.description ||"" // description eka awe nethoth product create kraddi || "" me wage null stringekak dano, e kiuwe description ekak awe nethoth arka dagnno empty kiyala
        data.AltName = req.body.AltName || [] // [] demme user models eketh [] dapu nisa. string array ekak nisa.
        if(req.body.price == null) {
            res.status(400).json({message : "product price is required"})
            return; // return danne methanin ehata me code eka run wnna be price eka nethuwa req eka awa nisa
        }
        data.price = req.body.price;
        data.labledPrice = req.body.labledPrice || req.body.price;
        data.category = req.body.category || "other"
        data.images= req.body.images || ["/image/default-product-1.png","/image/default-product-2.png"]
        data.isVisible= req.body.isVisible
        data.brand= req.body.brand ||"generic"
        data.model= req.body.model ||"standard";

        await Product.updateOne({productId:productId}, data); // udama data kiyla empty json ekak heduwa passe ekata data dagnno uda line wala
        //data.price = body eke ena price e wage okkoma data tika ara empty json ekta dagena anthimata e data kiyana j son eka update krno. nthan update one
        //kiyna thenata ara req eke ena data okkoma type krnna weno.

        res.status(201).json({message : "product updated successfully" });


    }
catch(error){
    res.status(500).json({message : "error updating products", error : error})
}
}

export async function getProductById(req,res){

    try{

        const productId = req.params.productId;
        const product = await Product.findOne({productId:productId})

        if(product == null)
        {
            res.status(404).json({message : "product not found"});
            return;
        }

        if(!product.isVisible){
            if(!isAdmin(req)){
                res.status(404).json({message: "product not found"});
                return; 
            }
        }
            res.status(200).json(product);
    }
    catch(error){

            res.status(500).json({message : "error fetching products", error:error})
    }
}