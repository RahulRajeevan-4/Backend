import express from "express";
import { errorHandler, handler404 } from "./middleware/errorHandler.js";
import {validateUser} from "./middleware/validate.js"
const app = express();

// Basic middleware (we’ll expand this soon)
app.use(express.json());

// Routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/crash", (req, res) => {
  throw new Error("Boom");
});

app.get("/echo", (req, res) => {
  res.json({ ok: true });
});

app.post("/users", validateUser, (req, res) => {
  res.status(201).json(req.user);
});

app.use(handler404);
app.use(errorHandler);

export default app;
