import IO from 'koa-socket';
import { gameCategories } from '../seed/game-categories.seed';
import Chat from '../models/chat.model';

const chatRoomEvents = {
	connection: 'connection',
	joinRoom: 'joinRoom',
	message: 'message',
	newMessage: 'newMessage',
	typing: 'typing',
	userTyping: 'userTyping',
	userStopTyping: 'userStopTyping',
	stopTyping: 'stopTyping',
	leaveRoom: 'leaveRoom',
	disconnect: 'disconnect'
};

export function initializeChatRooms(app) {
	const chatRooms = Object.keys(gameCategories);

	chatRooms.map(room => {
		return {roomName: new IO(room)}
	})
	.forEach(chatRoom => {
		chatRoom.roomName.attach(app);
		chatRoom.roomName.on(chatRoomEvents.connection, ctx => {
			const socket = ctx.socket;
			console.log('someone connect: %s', socket.id);

			socket.on(chatRoomEvents.joinRoom, ctx => {
				socket.emit(chatRoomEvents.message, {
					message: `Welcome to the ${ctx} chat room!`,
					userName: 'dev-bot',
					createdOn: new Date()
				});
			});

			socket.on(chatRoomEvents.newMessage, async ctx => {
				const newChat = new Chat(ctx);
				await newChat.save();
				chatRoom.roomName.broadcast(chatRoomEvents.message, ctx);
			});

			socket.on(chatRoomEvents.typing, ctx => {
				chatRoom.roomName.broadcast(chatRoomEvents.userTyping, {userName: ctx, isTyping: true});

			});

			socket.on(chatRoomEvents.stopTyping, ctx => {
				chatRoom.roomName.broadcast(chatRoomEvents.userStopTyping, null);
			});

			socket.on(chatRoomEvents.leaveRoom, ctx => {
				chatRoom.roomName.broadcast(chatRoomEvents.message, {
					message: `${ctx} has left the room.`,
					userName: 'dev-bot',
					createOn: new Date()
				});
			});

			socket.on(chatRoomEvents.disconnect, ctx => {
				console.log('user has left the room ' + ctx);
			});
		});
	});
}