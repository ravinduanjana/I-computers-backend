import express from "express";
import { createOrder, getOrders } from "../controllers/ordersController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder)
orderRouter.get("/:PageSize/:PageNumber", getOrders)

export default orderRouter;