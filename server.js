require("dotenv").config({ path: "./config.env" })
// require('dotenv').config()
const express = require('express');
const app = express()
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();
// connect route 


app.use(express.json())
app.get("/", (req, res, next) => {
    res.send("Api running");
});
app.use("/api/auth", require("./routes/auth")) //redirected to auth router 
app.use("/api/private", require("./routes/private")) //you can't access without jwt token 
// Error Handler Middleware
app.use(errorHandler);





const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});