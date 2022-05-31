require("dotenv").config({})
const express = require("express");
const server = express();
const { errorHandler } = require('./MiddleWare/errorMiddleware')
const connectDB = require("./DB/db")

connectDB()

const PORT = process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/users", require("./Routes/UserRoutes"));
server.use(errorHandler)

server.listen(PORT, () => console.info("Server is running on http://localhost:" + PORT));
