const express = require("express");
const Incident = require("../models/Incident");
const authenticateToken = require("../middleware/Auth");

const router = express.Router();

// Create an incident
router.post("/", authenticateToken, async (req, res) => {
    try {
        const incident = await Incident.create({
            ...req.body,
            reportedBy: req.user.userId
        });

        res.status(201).json({
            message: "Incident created successfully",
            incident
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create incident",
            error: error.message
        });
    }
});

// Get all incidents
router.get("/", async (req, res) => {
    try {
        const incidents = await Incident.find().sort({ createdAt: -1 });

        res.json({
            count: incidents.length,
            incidents
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch incidents",
            error: error.message
        });
    }
});

module.exports = router;