const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "incident",
                "weather",
                "health",
                "system"
            ],
            required: true
        },

        severity: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium"
        },

        incident: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Incident"
        },

        targetRole: {
            type: String,
            enum: ["citizen", "rescue_team", "authority", "admin", "all"],
            required: true
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Alert", alertSchema);