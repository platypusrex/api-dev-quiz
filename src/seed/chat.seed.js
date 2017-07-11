import Chat from '../models/chat.model';
import { gameCategories } from '../seed/game-categories.seed';

const randomInt = Math.floor(Math.random() * 5) + 1;

export function getChatRooms() {
	const chatRoomNames = Object.keys(gameCategories);

	return chatRoomNames.map(chatRoomName => {
		const randomInt = Math.floor(Math.random() * 6) + 1;
		return {
			createOn: new Date(),
			message: `Awesome...I'm in the ${chatRoomName} room. woohoo!`,
			userName: `bot_${randomInt}`,
			roomName: chatRoomName
		}
	});
}

export function seedChatRooms() {
	Chat.find().remove().exec();
	const chatRooms = getChatRooms();
	chatRooms.forEach(chatRoom => {
		const newChat = new Chat(chatRoom);
		newChat.save();
	});
}
