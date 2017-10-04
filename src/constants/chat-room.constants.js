import { defaultSocketEvents } from "./socket-events.constants";

export const chatRoomEvents = Object.assign({}, defaultSocketEvents, {
	newMessage: 'newMessage',
	typing: 'typing',
	userTyping: 'userTyping',
	userStopTyping: 'userStopTyping',
	stopTyping: 'stopTyping',
});