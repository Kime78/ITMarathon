import express from "express";
// import itemRoutes from './routes/itemRoutes';
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/users";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
