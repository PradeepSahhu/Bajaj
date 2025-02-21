import express from "express";
// import { postBfhl, getBfhl } from "../controllers/user.controller.js";
import { postBfhl, getBfhl } from "../controllers/user.controllers.js";

const router = express.Router();

// POST and GET routes for /bfhl
router.post("/", postBfhl);
router.get("/", getBfhl);
router.get("/", (req, res) => {
  res.status(200).json({ working: "this is working" });
});

export default router;
