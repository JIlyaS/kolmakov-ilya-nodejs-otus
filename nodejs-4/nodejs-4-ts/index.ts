import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./routes/users.route";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(new Date().toISOString());
  next();
});

app.use("/users", userRouter);

app.listen(3000, () => console.log("Hello from 3000"));
