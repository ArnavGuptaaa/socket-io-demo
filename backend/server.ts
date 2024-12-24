import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import setupSocket from "./sockets";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

app.use(express.json());

// Initialize Socket Connection
setupSocket(io);

httpServer.listen(3000, () => console.log("Server up and running!"));
