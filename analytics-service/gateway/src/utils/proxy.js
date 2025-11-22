import axios from "axios";

export const forward = async (req, res, target) => {
  try {
    const response = await axios({
      method: req.method,
      url: target + req.originalUrl.replace(/\/(staff|station|rental|analytics)/, ""),
      headers: req.headers,
      data: req.body,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Gateway error", details: err.message });
  }
};
