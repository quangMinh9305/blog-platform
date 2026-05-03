import express from "express";
import mongoose from "mongoose";
// Import Routers
import testRoute from "./routes/testRoute.js";

const app = express();
// API Routes
app.use("/test", testRoute);

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

mongoose.connect("mongodb+srv://adminblogger:os5lLEXfA5yh6VOh@blog-db.zzzygyk.mongodb.net/?appName=blog-db").then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Failed to connect DB!");
})