const express = require("express")
const usersRouter = require("../routes/users");
const fruitsRouter = require("../routes/fruits");
const app = express()

app.use(express.json());

app.use("/users", usersRouter);
app.use("/fruits", fruitsRouter);

module.exports = app;