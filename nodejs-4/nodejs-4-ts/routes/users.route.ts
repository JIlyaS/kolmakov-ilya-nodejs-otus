import express from "express";

const userRouter = express.Router();

type Data = {
  name: string;
};

let database: Array<Data> = [];

userRouter.get("/", (req, res) => {
  res.send(JSON.stringify(database));
});

userRouter.delete("/:pattern", (req, res) => {
  const param = req.params.pattern;
  database = database.filter((x) => x.name !== param);
  res.send(`Deleted ${param}`);
});

userRouter.post("/", (req, res) => {
  console.log(req.body);
  database.push(req.body);
  res.send(req.body);
});

export default userRouter;
