import qs from "qs";
import crypto from "crypto";
import axios from "axios";
import { db } from "../config/db.js";

export const vnpReturn = async (req, res) => {
  try {
    const vnpParams = req.query;
    const secureHash = vnpParams.vnp_SecureHash;

    let params = {};
    Object.keys(vnpParams).forEach((key) => {
      if (key !== "vnp_SecureHash") params[key] = vnpParams[key];
    });

    const secretKey = process.env.VNP_HASHSECRET;

    const signData = qs.stringify(params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    const isValid = secureHash === signed;

    if (!isValid) return res.json({ RspCode: "97", Message: "Invalid checksum" });

    const orderId = params.vnp_TxnRef;
    const status = params.vnp_ResponseCode === "00" ? "paid" : "failed";

    db.run(
      `UPDATE payments SET status=? WHERE orderId=?`,
      [status, orderId]
    );

    // Notify rental-service
    await axios.patch(`http://localhost:4001/rental/${orderId}/payment-status`, {
      status
    });

    // Push to analytics
    axios.post("http://localhost:4004/analytics/event", {
      type: "payment.result",
      payload: { orderId, status }
    });

    return res.json({ code: "00", message: "Payment verified", status });

  } catch (err) {
    return res.json({ RspCode: "99", Message: err.message });
  }
};
