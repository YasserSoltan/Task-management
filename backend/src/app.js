const express = require("express");
const cors = require('cors');
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const env = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${env}` });

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the User API");
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.use((req, res, next) =>
  res.status(404).json({ message: "Route not found" })
);

app.use(errorMiddleware);

module.exports = app;
