import { appendChatElement } from "./helper.js";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
	document.querySelector("#socket-id").innerHTML = socket.id;

	socket.on("chat:message", (data) => {
		appendChatElement("#chat-feed", data);
	});
});

// Event listeners

// IO Emit
const ioEmitInput = document.querySelector("#io-emit-input");
const ioEmitSend = document.querySelector("#io-emit-send");

ioEmitSend.addEventListener("click", () => {
	if (!socket) return;

	const message = ioEmitInput.value;

	socket.emit("chat:message", { id: socket.id, message });

	ioEmitInput.value = "";
});

// IO to Emit
const ioToEmitRoomInput = document.querySelector("#io-to-emit-room-input");
const ioToEmitMessageInput = document.querySelector(
	"#io-to-emit-message-input"
);
const ioToEmitSend = document.querySelector("#io-to-emit-send");

ioToEmitSend.addEventListener("click", () => {
	if (!socket || !ioToEmitRoomInput.value) return;

	const message = ioToEmitMessageInput.value;

	socket.emit("room:message", {
		id: socket.id,
		roomId: ioToEmitRoomInput.value,
		message,
	});

	ioToEmitMessageInput.value = "";
});

// Socket join and leave
const socketJoinInput = document.querySelector("#socket-join-input");
const socketJoinSubmit = document.querySelector("#socket-join-btn");
const socketLeaveInput = document.querySelector("#socket-leave-input");
const socketLeaveSubmit = document.querySelector("#socket-leave-btn");

socketJoinSubmit.addEventListener("click", () => {
	if (!socket || !socketJoinInput.value) return;

	socket.emit("room:join", {
		id: socket.id,
		roomId: socketJoinInput.value,
	});

	socketJoinInput.value = "";
});

socketLeaveSubmit.addEventListener("click", () => {
	if (!socket || !socketLeaveInput.value) return;

	socket.emit("room:leave", {
		id: socket.id,
		roomId: socketLeaveInput.value,
	});

	socketLeaveInput.value = "";
});

// Socket emit
const socketEmit = document.querySelector("#socket-emit-send");

socketEmit.addEventListener("click", () => {
	if (!socket) return;

	socket.emit("emit", {
		id: socket.id,
	});
});

// Socket to
const socketToId = document.querySelector("#socket-to-room-input");
const socketToMessage = document.querySelector("#socket-to-message-input");
const socketToSend = document.querySelector("#socket-to-send");

socketToSend.addEventListener("click", () => {
	if (!socket || !socketToId.value) return;

	const message = socketToMessage.value;

	socket.emit("chat:dm", {
		id: socket.id,
		roomId: socketToId.value,
		message,
	});

	socketToMessage.value = "";
});

// Socket broadcast
const socketBroadcastMessage = document.querySelector(
	"#socket-broadcast-message-input"
);
const socketBroadcastSend = document.querySelector("#socket-broadcast-send");

socketBroadcastSend.addEventListener("click", () => {
	if (!socket) return;

	const message = socketBroadcastMessage.value;

	socket.emit("chat:announce", {
		id: socket.id,
		message,
	});

	socketBroadcastMessage.value = "";
});
