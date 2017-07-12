import IO from 'koa-socket';
import { gameCategories } from '../seed/game-categories.seed';
import Chat from '../models/chat.model';

export function initializeChatRooms(app) {
	const chatRooms = Object.keys(gameCategories);

	chatRooms.map(room => {
		return {roomName: new IO(room)}
	})
	.forEach(chatRoom => {
		chatRoom.roomName.attach(app);
		chatRoom.roomName.on('connection', ctx => {
			const socket = ctx.socket;
			console.log('someone connect: %s', socket.id);

			socket.on('joinRoom', ctx => {
				socket.emit('message', {
					message: `Welcome to the ${ctx} chat room!`,
					userName: 'dev-bot',
					createdOn: new Date()
				});
			});

			socket.on('newMessage', async ctx => {
				const newChat = new Chat(ctx);
				await newChat.save();
				chatRoom.roomName.broadcast('message', ctx);
			});

			socket.on('typing', ctx => {
				chatRoom.roomName.broadcast('userTyping', {userName: ctx, isTyping: true});

			});

			socket.on('stopTyping', ctx => {
				chatRoom.roomName.broadcast('userStopTyping', null);
			});

			socket.on('leaveRoom', ctx => {
				chatRoom.roomName.broadcast('message', {
					message: `${ctx} has left the room.`,
					userName: 'dev-bot',
					createOn: new Date()
				});
			});

			socket.on('disconnect', ctx => {
				console.log('user has left the room ' + ctx);
			});
		});
	});
}