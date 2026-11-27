import Order from "../models/orders.js";
import Product from "../models/product.js";
import mongoose from "mongoose";
import { isAdmin } from "./usercontroller.js";

// Atomic counter for generating order IDs
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence: { type: Number, default: 0 }
});

const Counter = mongoose.models.OrderCounter ||
    mongoose.model("OrderCounter", counterSchema);

export async function createOrder(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized login, Please login to place and order"
        });
        return;
    }

    try {

        const orderData = {
            orderId: "ORD000001",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            city: req.body.city,
            country: req.body.country,
            postalCode: req.body.postalCode,
            email: req.user.email,
            items: [],
            phone: req.body.phone,
            total: 0
        };

        if (orderData.firstName == "") {
            orderData.firstName = req.user.firstName;
        }

        if (orderData.lastName == "") {
            orderData.lastName = req.user.lastName;
        }

        if (orderData.addressLine1 == "") {
            res.status(404).json({
                message: "Address line1 is required"
            });
            return;
        }

        // Check order items
        if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            });
        }

        // Find the highest existing order ID
        const lastOrder = await Order.findOne().sort({ orderId: -1 });

        let highestOrderNumber = 0;

        if (lastOrder != null) {
            highestOrderNumber = parseInt(
                lastOrder.orderId.replace("ORD", "")
            );
        }

        // Keep the counter synchronized with existing orders
        await Counter.updateOne(
            { _id: "orderId" },
            { $max: { sequence: highestOrderNumber } },
            { upsert: true }
        );

        // Generate the next order ID atomically
        const counter = await Counter.findOneAndUpdate(
            { _id: "orderId" },
            { $inc: { sequence: 1 } },
            { new: true, upsert: true }
        );

        const newOrderNumberInString = counter.sequence
            .toString()
            .padStart(6, "0");

        orderData.orderId = "ORD" + newOrderNumberInString;

        console.log("Generated Order ID:", orderData.orderId);

        // Check order items
        for (let i = 0; i < req.body.items.length; i++) {

            const item = req.body.items[i];

            const product = await Product.findOne({
                productId: item.productId
            });

            if (product == null) {
                return res.status(404).json({
                    message: "Product with Id " + item.productId + " not found."
                });
            }

            // Check product visibility
            if (product.isVisible === false) {
                return res.status(404).json({
                    message: "Product with Id " + item.productId + " is not available."
                });
            }

            if (!Number.isInteger(item.qty) || item.qty <= 0) {
                return res.status(400).json({
                    message: "Invalid product quantity"
                });
            }

            orderData.items.push({

                productId: product.productId,
                name: product.name,
                price: product.price,
                labelledPrice: product.labelledPrice,
                image: product.images?.[0] || "",
                qty: item.qty

            });

            orderData.total += product.price * item.qty;

        }

        // Save order
        const newOrder = new Order(orderData);

        await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",
            orderId: orderData.orderId
        });

    } catch (error) {

        console.log("Error creating the order:", error);

        res.status(500).json({
            message: "Error creating the order"
        });
    
    }

}


 export async function getOrders(req, res){

        if(req.user == null){
            res.status(401).json({Message: "Unauthorized, please login to view yours orders."});
            return;
        }
        const pageSizeInString = req.params.PageSize || "10" //req eke ena size eka page size eka widyt gnna nethna ehema ekak awe nethn 10 gnna
        const pageNumberInString =req.params.pageNumber || "1"
        const pageSize = parseInt(pageSizeInString)
        const pageNumber = parseInt(pageNumberInString)

        

        try{
            
        if(isAdmin(req)){
            const numberOfOrders = await Order.countDocuments()
            const numberOfPages = Math.ceil(numberOfOrders / pageSize)
            const orders = await Order.find().sort({date : -1}).skip((pageNumber - 1) * pageSize).limit(pageSize) //okkoma orders tika argena aluthma date eka thiyena order eka mulin pennanna. 

            res.json({
                orders : orders,
                totalPages : numberOfPages
            })


        } else{
            const numberOfOrders = await Order.countDocuments()
            const numberOfPages = Math.ceil(numberOfOrders / pageSize)
            const orders = await Order.find({email : req.user.email}).sort({date : -1}).skip((pageNumber - 1) * pageSize).limit(pageSize) //okkoma orders tika argena aluthma date eka thiyena order eka mulin pennanna. 

            res.json({
                orders : orders,
                totalPages : numberOfPages
            })


        }

       
        } catch(error){
            console.log("error fetching products", error)
            req.status(500).json({message :"error fetching Products", error : error})


        }

        

    }
 

