import express from "express";
// import itemRoutes from './routes/itemRoutes';
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/users";
import cors from "cors";
import messageRoutes from "./routes/messages";
import { Server } from "socket.io";
import http from "http";
import userSettingsRoutes from "./routes/userSettings";
import groupRoutes from "./routes/groups";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swaggerOptions";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    cors: { origin: "*" },
});

app.use(cors());

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/userSettings", userSettingsRoutes);
app.use("/api/group", groupRoutes)

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
