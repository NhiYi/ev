import moment from "moment";
import qs from "qs";
import crypto from "crypto";
import axios from "axios";

export const createVnpayPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASHSECRET;
    const returnUrl = process.env.VNP_RETURNURL;
    const vnpUrl = process.env.VNP_URL;

    let date = moment().format("YYYYMMDDHHmmss");

    let orderInfo = `Thanh toan don hang #${orderId}`;

    let params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: "other",
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: "127.0.0.1",
      vnp_CreateDate: date
    };

    // Sort params
    params = Object.keys(params)
      .sort()
      .reduce((acc, key) => ((acc[key] = params[key]), acc), {});

    const signData = qs.stringify(params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    params.vnp_SecureHash = signed;

    const paymentUrl = `${vnpUrl}?${qs.stringify(params, { encode: false })}`;

    res.json({ paymentUrl });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
