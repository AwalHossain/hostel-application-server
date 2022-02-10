const express = require("express");
const app = express();
// const errorMiddleware = require("./middleware/error");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
var cors = require("cors");

app.use(express.json());
app.use(cors());
// environment file
const dotenv = require("dotenv");
dotenv.config();

//Handle Uncaught error

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise`);
  process.exit(1);
});

//Router

const foodItemRoute = require("./routes/foodItem");
const studentRoute = require("./routes/student");
const distributeRoute = require("./routes/distribution");
// const orderRoute = require("./routes/order");
// console.log(MONGODB_URI);
// mongodb connection
mongoose
  .connect(
    "mongodb+srv://skill:IIyPxwfNn42XIFpH@cluster0.33slg.mongodb.net/YoodaHostel?retryWrites=true&w=majority"
  )
  .then((data) => console.log(`Mongodb is connected  `));

// connectDB();

//Router
app.use("/api", foodItemRoute);
app.use("/api", studentRoute);
app.use("/api", distributeRoute);
// app.use("/api", orderRoute);

// Middleware for Error
// app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`This server is running on ${port}`);
});

// Unhandled promise Rejection

// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to unhandled Promise`);
//   server.close(() => {
//     process.exit(1);
//   });
// });
