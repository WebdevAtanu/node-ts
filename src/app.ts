import express from "express";
import userRoutes from "./modules/user/user.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express(); // create express app

app.use(express.json()); // parse JSON request body

app.use("/api/users", userRoutes); // mount user routes

app.use(errorHandler); // global error handler

export default app;
