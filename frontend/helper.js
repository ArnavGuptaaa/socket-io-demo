export const appendChatElement = (parentId, data) => {
	const parentElement = document.querySelector(parentId);

	if (!parentElement) return;

	const chatElement = document.createElement("p");

	if (data.roomId) {
		chatElement.innerHTML += `<span class="font-bold text-xs text-green-400">(${data.roomId})</span>&nbsp;`;
	}
	chatElement.innerHTML += `<span class="font-bold text-xs">${data.id}:</span>&nbsp;`;
	chatElement.innerHTML += `<span class="text-xs">${data.message}</span>`;
	chatElement.classList.add("mb-2");

	parentElement.appendChild(chatElement);
};
