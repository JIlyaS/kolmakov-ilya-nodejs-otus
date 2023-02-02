import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ name: "nik" }]);
});

router.post("/", (req, res) => {
  res.json({ status: true });
});

export default router;
