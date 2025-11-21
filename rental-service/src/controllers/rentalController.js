import { RentalModel } from "../models/RentalModel.js";
import { PriceService } from "../services/priceService.js";
import axios from "axios";

export const RentalController = {
  // 1. Create rental
  async create(req, res) {
    try {
      const rental = await RentalModel.create({
        userId: req.user.id,
        vehicleId: req.body.vehicleId,
        stationId: req.body.stationId,
        status: "created"
      });

      // 🔵 LOG → analytics
      axios.post("http://localhost:4004/analytics/event", {
        type: "rental.created",
        payload: rental
      });

      res.json({ message: "Rental created", rental });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 2. Start rental
  async start(req, res) {
    try {
      await RentalModel.start(req.params.id);

      // 🔵 LOG → rental.started
      axios.post("http://localhost:4004/analytics/event", {
        type: "rental.started",
        payload: { rentalId: req.params.id }
      });

      res.json({ message: "Rental started" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 3. End rental
  async end(req, res) {
    try {
      const { distanceKm, durationMinutes } = req.body;

      const amount = PriceService.calculate(distanceKm, durationMinutes);

      await RentalModel.end(
        req.params.id,
        new Date().toISOString(),
        distanceKm,
        durationMinutes
      );

      // 🔵 LOG → rental.ended
      axios.post("http://localhost:4004/analytics/event", {
        type: "rental.ended",
        payload: {
          rentalId: req.params.id,
          distanceKm,
          durationMinutes,
          amount
        }
      });

      res.json({
        message: "Rental ended",
        price: amount,
        distanceKm,
        durationMinutes
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 4. Upload handover images
  async uploadImages(req, res) {
    try {
      const files = req.files.map(f => "/uploads/" + f.filename);
      await RentalModel.updateHandoverImages(req.params.id, files);

      res.json({ message: "Images uploaded", files });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 5. Upload contract
  async uploadContract(req, res) {
    try {
      const file = "/uploads/" + req.file.filename;
      await RentalModel.updateContractFile(req.params.id, file);

      res.json({ message: "Contract uploaded", file });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 6. Pay deposit
  async payDeposit(req, res) {
    try {
      await RentalModel.payDeposit(req.params.id, req.body.amount);

      res.json({ message: "Deposit paid" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 7. Refund
  async refund(req, res) {
    try {
      await RentalModel.refundDeposit(req.params.id);
      res.json({ message: "Deposit refunded" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 8. Get by ID
  async getById(req, res) {
    try {
      const rental = await RentalModel.findById(req.params.id);
      res.json(rental);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 9. My rentals
  async myRentals(req, res) {
    try {
      const rentals = await RentalModel.findByUser(req.user.id);
      res.json(rentals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
