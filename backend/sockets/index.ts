import { Server } from "socket.io";
import messageEvents from "./events/messages";

const setupSocket = (io: Server) => {
	io.on("connection", (socket) => {
		socket.broadcast.emit("chat:message", {
			id: "Server",
			message: `${socket.id} joined!`,
		});

		// Register Events
		messageEvents(io, socket);

		socket.on("emit", (data) => {
			io.emit("chat:message", {
				id: data.id,
				message: "I emitted an event",
			});
		});

		socket.on("disconnect", () => {
			console.log(`${socket.id} disconnected`);
		});
	});
};

export default setupSocket;
