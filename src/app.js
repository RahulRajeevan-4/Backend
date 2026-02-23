import express from "express";
import { errorHandler, handler404 } from "./middleware/errorHandler.js";

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

app.post("/users", (req, res) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let messageObj = {};
  let user = { ...req.body, id: Date.now() };
  if (user.name && user.email) {
    if (
      user.name.trim().length >= 2 &&
      user.name.trim().length <= 50 &&
      emailRegex.test(user.email)
    ) {
      if(!user.age||(user.age >= 13 && user.age <= 120)){
        res.status(201).send(user);
      }
       else {
        messageObj = { field: "age", message: "Age should be >=13 and <=120" };
      }
    }
  } else {
    if (!user.email&&!user.name) {
      messageObj = {
        field: "email & name",
        message: "Name & email is required",
      }
    } else if (!user.name) {
      messageObj = { field: "name", message: "Name is required" };
    } else {
      messageObj = { field: "email", message: "Email is required" };
    }
  }
  res.status(400).json({
    error: {
      message: "Validation failed",
      details: [messageObj],
    },
  });
});

app.use(handler404);
app.use(errorHandler);

export default app;
