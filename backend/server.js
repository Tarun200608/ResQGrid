const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const healthRoutes = require("./routes/health");
const userRoutes = require("./routes/User");
const incidentRoutes = require("./routes/Incident");
const rescueTeamRoutes = require("./routes/RescueTeam");
const alertRoutes = require("./routes/Alert");
const resourceRoutes = require("./routes/Resource");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/rescue-teams", rescueTeamRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/resources", resourceRoutes);
console.log("User routes registered");

app.get("/", (req, res) => {
    res.json({
        message: "ResQGrid API is running 🚨"
    });
});

app.use("/api/health", healthRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`ResQGrid server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
        process.exit(1);
    }
}

startServer();