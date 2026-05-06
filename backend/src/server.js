import express from "express";
import { config } from "dotenv";
// Import Routers
import testRoute from "./routes/testRoute.js";


config();

const app = express();
// API Routes
app.use("/test", testRoute);

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});