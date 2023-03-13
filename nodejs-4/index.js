import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./user/index.js";

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static("public"));
app.use("/users", userRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/status", function (req, res) {
  res.sendStatus(204);
});

app.get("/file", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/file-attach", function (req, res) {
  res.download(
    path.join(__dirname, "./index.html"),
    "my-index.html",
    function (err) {
      if (err) {
      } else {
      }
    }
  );
});

app.get("/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.post("/product", (req, res) => {
  console.log("body", req.body);
  res.send("Ok");
});

app.get("/", function (req, res) {
  res.send("Hello world");
});

const server = app.listen(4000, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
