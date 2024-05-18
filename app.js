const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();

const boardRoutes = require("./routes/board");
const listRoutes = require("./routes/list");
const cardRoutes = require("./routes/card");
const authRoutes = require("./routes/auth");

const bodyParser = require("body-parser");
const setHeaders = require("./middleware/headers");
const sendErrorResponse = require("./controllers/error");

app.use(bodyParser.json());
app.use(helmet());
app.use(setHeaders);

app.use("/auth", authRoutes);
app.use("/board", boardRoutes);
app.use("/list", listRoutes);
app.use("/card", cardRoutes);

app.use(sendErrorResponse);

app.get("/", function (req, res) {
  res.write("Welcome ...");
});

mongoose
  .connect(
    `mongodb+srv://taskify:wSQgPAJAKQoWDHcp@taskify.9eybgbo.mongodb.net/?retryWrites=true&w=majority&appName=taskify`
  )
  .then(() =>{
    app.listen(process.env.PORT || 8080)
    console.log("Server listening on port " + process.env.PORT)
  })
  .catch((err) => console.log(err));


