const express = require("express");
const Resource = require("../models/Resource");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const resource = await Resource.create(req.body);

        res.status(201).json({
            message: "Resource created successfully",
            resource
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create resource",
            error: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });

        res.json({
            count: resources.length,
            resources
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch resources",
            error: error.message
        });
    }
});

module.exports = router;
