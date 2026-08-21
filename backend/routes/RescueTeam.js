const express = require("express");
const RescueTeam = require("../models/RescueTeam");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const team = await RescueTeam.create(req.body);

        res.status(201).json({
            message: "Rescue team created successfully",
            team
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create rescue team",
            error: error.message
        });
    }
});

module.exports = router;