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

module.exports = router;