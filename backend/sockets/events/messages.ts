import { Server, Socket } from "socket.io";

interface messageData {
	id: string;
	message: string;
}

interface roomMessageData extends messageData {
	roomId: string;
}

interface roomJoinLeaveData {
	id: string;
	roomId: string;
}

const messageEvents = (io: Server, socket: Socket) => {
	socket.on("chat:message", (data: messageData) => {
		io.emit("chat:message", data);
	});

	socket.on("chat:dm", (data: roomMessageData) => {
		socket.to(data.roomId).emit("chat:message", data);
	});

	socket.on("chat:announce", (data: messageData) => {
		socket.broadcast.emit("chat:message", data);
	});

	socket.on("room:message", (data: roomMessageData) => {
		io.to(data.roomId).emit("chat:message", data);
	});

	socket.on("room:join", (data: roomJoinLeaveData) => {
		socket.join(data.roomId);
	});

	socket.on("room:leave", (data: roomMessageData) => {
		socket.leave(data.roomId);
	});
};

export default messageEvents;
