import express from "express";
import { RentalController } from "../controllers/rentalController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Create rental
router.post("/", auth, RentalController.create);

// Start rental
router.post("/:id/start", auth, RentalController.start);

// End rental
router.post("/:id/end", auth, RentalController.end);

// Upload handover images
router.post("/:id/images", upload.array("images"), RentalController.uploadImages);

// Upload contract file
router.post("/:id/contract", upload.single("contract"), RentalController.uploadContract);

// Pay deposit
router.post("/:id/deposit", auth, RentalController.payDeposit);

// Refund deposit
router.post("/:id/refund", auth, RentalController.refund);

// Get rental detail
router.get("/:id", auth, RentalController.getById);

// My rentals
router.get("/", auth, RentalController.myRentals);

export default router;
