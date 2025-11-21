import express from "express";
import multer from "multer";
import {
  register,
  login,
  uploadDocuments,
  staffVerifyRenter,
  getUser
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Lưu file upload vào thư mục /uploads
const upload = multer({ dest: "uploads/" });

// -------- AUTH --------
router.post("/register", register);
router.post("/login", login);

// -------- UPLOAD CCCD + GPLX --------
// FE bắt buộc gửi form-data với 2 field:
// - cccdImage
// - licenseImage
router.post(
  "/upload-docs",
  upload.fields([
    { name: "cccdImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 }
  ]),
  uploadDocuments
);

// -------- STAFF VERIFY --------
router.post(
  "/verify/:id",
  authMiddleware(["staff", "admin"]),
  staffVerifyRenter
);

// -------- GET USER --------
router.get("/:id", authMiddleware(), getUser);

export default router;
