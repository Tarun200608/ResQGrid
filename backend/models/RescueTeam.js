const mongoose = require("mongoose");

const rescueTeamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        teamType: {
            type: String,
            enum: [
                "fire_rescue",
                "medical",
                "police",
                "national_response",
                "disaster_management",
                "other"
            ],
            required: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        membersCount: {
            type: Number,
            default: 1,
            min: 1
        },

        status: {
            type: String,
            enum: ["available", "busy", "offline"],
            default: "available"
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("RescueTeam", rescueTeamSchema);