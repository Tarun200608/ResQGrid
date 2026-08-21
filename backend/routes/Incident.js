const express = require("express");
const Incident = require("../models/Incident");
const authenticateToken = require("../middleware/Auth");
const authorizeRoles = require("../middleware/Role");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    authorizeRoles("citizen"),
    async (req, res) => {
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
    }
);

// Get all incidents
router.get(
    "/",
    authenticateToken,
    authorizeRoles("authority", "admin"),
    async (req, res) => {
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

router.get(
    "/assigned",
    authenticateToken,
    authorizeRoles("rescue_team"),
    async (req, res) => {
        try {
            const incidents = await Incident.find({
                responseStatus: {
                    $in: ["assigned", "accepted", "in_progress"]
                }
            })
                .populate("reportedBy", "name email")
                .populate("assignedTeam", "name teamType status")
                .sort({ createdAt: -1 });

            res.json({
                count: incidents.length,
                incidents
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch assigned incidents",
                error: error.message
            });
        }
    }
);

router.patch(
    "/:id/assign",
    authenticateToken,
    authorizeRoles("authority", "admin"),
    async (req, res) => {
        try {
            const { teamId } = req.body;

            if (!teamId) {
                return res.status(400).json({
                    message: "teamId is required"
                });
            }

            const incident = await Incident.findByIdAndUpdate(
                req.params.id,
                {
                    assignedTeam: teamId,
                    responseStatus: "assigned",
                    status: "assigned"
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!incident) {
                return res.status(404).json({
                    message: "Incident not found"
                });
            }

            res.json({
                message: "Rescue team assigned successfully",
                incident
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to assign rescue team",
                error: error.message
            });
        }
    }
);

router.patch(
    "/:id/accept",
    authenticateToken,
    authorizeRoles("rescue_team"),
    async (req, res) => {
        try {
            const incident = await Incident.findOneAndUpdate(
                {
                    _id: req.params.id,
                    assignedTeam: { $ne: null },
                    responseStatus: "assigned"
                },
                {
                    responseStatus: "accepted"
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!incident) {
                return res.status(404).json({
                    message: "Assigned incident not found"
                });
            }

            res.json({
                message: "Incident accepted successfully",
                incident
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to accept incident",
                error: error.message
            });
        }
    }
);

router.patch(
    "/:id/start",
    authenticateToken,
    authorizeRoles("rescue_team"),
    async (req, res) => {
        try {
            const incident = await Incident.findOneAndUpdate(
                {
                    _id: req.params.id,
                    responseStatus: "accepted"
                },
                {
                    responseStatus: "in_progress",
                    status: "in_progress"
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!incident) {
                return res.status(404).json({
                    message: "Accepted incident not found"
                });
            }

            res.json({
                message: "Rescue operation started",
                incident
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to start rescue operation",
                error: error.message
            });
        }
    }
);

router.patch(
    "/:id/resolve",
    authenticateToken,
    authorizeRoles("rescue_team", "authority", "admin"),
    async (req, res) => {
        try {
            const incident = await Incident.findOneAndUpdate(
                {
                    _id: req.params.id,
                    responseStatus: "in_progress"
                },
                {
                    responseStatus: "resolved",
                    status: "resolved"
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!incident) {
                return res.status(404).json({
                    message: "Incident in progress not found"
                });
            }

            res.json({
                message: "Incident resolved successfully",
                incident
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to resolve incident",
                error: error.message
            });
        }
    }
);

module.exports = router;