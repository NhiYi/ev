import { PaymentModel } from "../models/Payment.js";
import axios from "axios";

export const createPayment = async (req, res) => {
  try {
    const { rentalId, userId, amount, method, note } = req.body;

    const paymentId = await PaymentModel.create({
      rentalId,
      userId,
      amount,
      method,
      note,
      status: "success"
    });

    // 🔵 Gửi analytics
    axios.post("http://localhost:4004/analytics/event", {
      type: "payment.completed",
      payload: {
        paymentId,
        rentalId,
        userId,
        amount,
        method
      }
    });

    res.json({ message: "Payment recorded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPaymentsByRental = async (req, res) => {
  try {
    const data = await PaymentModel.findByRental(req.params.rentalId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
