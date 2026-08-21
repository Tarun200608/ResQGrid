const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "ambulance",
                "rescue_vehicle",
                "boat",
                "medical_kit",
                "generator",
                "other"
            ],
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["available", "deployed", "maintenance"],
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

module.exports = mongoose.model("Resource", resourceSchema);