const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "flood",
                "fire",
                "earthquake",
                "cyclone",
                "landslide",
                "accident",
                "medical",
                "other"
            ],
            required: true
        },

        severity: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium"
        },

        status: {
            type: String,
            enum: ["reported", "assigned", "in_progress", "resolved"],
            default: "reported"
        },

        location: {
            address: {
                type: String,
                trim: true
            },

            latitude: {
                type: Number
            },

            longitude: {
                type: Number
            }
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        assignedTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RescueTeam",
            default: null
        },

        responseStatus: {
            type: String,
            enum: ["unassigned", "assigned", "accepted", "in_progress", "resolved"],
            default: "unassigned"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Incident", incidentSchema);