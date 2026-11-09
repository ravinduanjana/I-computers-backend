import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";


//product controller eke hadapu variable productrouter ekata export krgnna one.
const productRouter = express.Router();
productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:trending", (req,res )=>{
    res.status(202).json({message: "this is trending product end point"}) 
})
productRouter.get("/:productId",getProductById);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId",updateProduct);
// product ekak delete kraddi json ekak liyano {"productId":"prod0003" } habai oke json
//  liynn nethuwath krna puluwan, localhost:3000/products/prod003 oya vidiyata type krla req eka ewala.
//  ehema krnnanam product router ekta :productId widiyata wenas krnna. productRouter.delete("/", deleteProduct);
//  mehema thiyena eka  productRouter.delete("/:productId", deleteProduct); me widiyata wenas kranna. :productId danna,
//  api eke agata.//ekata anuwa deleteproduct function ekada req.body eka req.params widiyta wenas weno. 



//siyaluma end points tika beluwama mewage exat name thiyenne ex- createproduct,getproducts, update products, trending ("/methanta monawath nethi ewa saha trending wage niyatha wachana thiyena ewa exact
// name, but "/productId" wage ewa thiyeddi product id eka eka eka values ena nisa ewa wenas wena values.)
//mehema thiyeddi ganna ona exact path thiyena ewa udata. itapasse yatata ganna exaxt path nethi wenas wena ewa. reason is, 
// mewa run weddi uda idan pahalata piliwelata run wena nisa ex- get localhost:3000/products/trending ohoma ekak awoth
//oka get productbyid ekta yanne gihin not fount kiyla pennano, but oka trending kiyna eka getproductbyid ekta udin thibboth hriyta run weno
//eknisa exact values thiyena ewa udata arn anith ewa pahalata danna.

export default productRouter;
