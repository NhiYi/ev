import express from "express";
import { createPayment, getPaymentsByRental } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/pay", createPayment);
router.get("/:rentalId", getPaymentsByRental);

export default router;
