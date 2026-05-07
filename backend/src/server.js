import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
// Import Routers
import testRoute from "./routes/testRoute.js";

config();
connectDB();

const app = express();
// API Routes
app.use("/test", testRoute);

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// Handle unhandled promis rejections (e.g., database connection errors)
process.on("UnhandledRejection", (err) => {
    console.error("Unhandled Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Handle uncaught exceptions
process.on("UncaughtRejection", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.error("SIGTERM received, shutting down gracefully");
    server.close(async() => {
        await disconnectDB();
        process.exit(1);
    })
});