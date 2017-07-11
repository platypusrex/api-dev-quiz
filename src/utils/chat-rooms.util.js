import IO from 'koa-socket';
import { gameCategories } from '../seed/game-categories.seed';

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
			const bot = {
				userName: 'dev-bot'
			};

			socket.on('joinRoom', ctx => {
				socket.emit('message', {message: `Welcome to the ${ctx} chat room!`, user: bot, date: new Date()});
			});

			socket.on('newMessage', ctx => {
				chatRoom.roomName.broadcast('message', ctx);
			});

			socket.on('typing', ctx => {
				chatRoom.roomName.broadcast('userTyping', {userName: ctx, isTyping: true});

			});

			socket.on('stopTyping', ctx => {
				chatRoom.roomName.broadcast('userStopTyping', null);
			});

			socket.on('leaveRoom', ctx => {
				chatRoom.roomName.broadcast('message', {message: `${ctx} has left the room.`, user: bot, date: new Date()});
			});

			socket.on('disconnect', ctx => {
				console.log('user has left the room ' + ctx);
			});
		});
	});
}

// export function initializeChatRooms(chatRooms) {
// 	chatRooms.forEach(chatRoom => {
// 		chatRoom.roomName.on('connection', ctx => {
// 			const socket = ctx.socket;
// 			console.log('someone connect: %s', socket.id);
// 			const bot = {
// 				userName: 'dev-bot'
// 			};
//
// 			socket.on('joinRoom', ctx => {
// 				socket.emit('message', {message: `Welcome to the ${ctx} chat room!`, user: bot, date: new Date()});
// 			});
//
// 			socket.on('newMessage', ctx => {
// 				chatRoom.roomName.broadcast('message', ctx);
// 			});
//
// 			socket.on('typing', ctx => {
// 				chatRoom.roomName.broadcast('userTyping', {userName: ctx, isTyping: true});
//
// 			});
//
// 			socket.on('stopTyping', ctx => {
// 				chatRoom.roomName.broadcast('userStopTyping', null);
// 			});
//
// 			socket.on('leaveRoom', ctx => {
// 				chatRoom.roomName.broadcast('message', {message: `${ctx} has left the room.`, user: bot, date: new Date()});
// 			});
//
// 			socket.on('disconnect', ctx => {
// 				console.log('user has left the room ' + ctx);
// 			});
// 		});
// 	});
// }