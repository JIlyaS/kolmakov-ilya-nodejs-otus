const express = require("express");
const cors = require("cors");
const path = require("path");

const { init } = require("./db");

const mainRouter = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "static")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", mainRouter);

init();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Express server listen on ${PORT}`));
