const express = require("express");
const Alert = require("../models/Alert");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const alert = await Alert.create(req.body);

        res.status(201).json({
            message: "Alert created successfully",
            alert
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create alert",
            error: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const alerts = await Alert.find()
            .populate("incident", "title type severity")
            .sort({ createdAt: -1 });

        res.json({
            count: alerts.length,
            alerts
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch alerts",
            error: error.message
        });
    }
});

module.exports = router;