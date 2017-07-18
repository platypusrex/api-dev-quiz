import IO from 'koa-socket-2';
import Game from '../models/game.model';
import { gameCategories } from '../seed/game-categories.seed';

const gameRoomEvents = {
	connection: 'connection',
	joinRoom: 'joinRoom',
	message: 'message',
	createGameMulti: 'createGameMulti',
	createGameSingle: 'createGameSingle',
	leaveRoom: 'leaveRoom',
	disconnect: 'disconnect',
	gameCreated: 'gameCreated',
	gameCreatedSuccess: 'gameCreatedSuccess',
	gameStarted: 'gameStarted',
	gameStartedSuccess: 'gameStartedSuccess'
};


export function initialGameRooms(app) {
	const gameRooms = Object.keys(gameCategories);

	gameRooms.map(room => {
		return {roomName: new IO({ namespace: `${room}-games` })};
	})
	.forEach(gameRoom => {
		gameRoom.roomName.attach(app);
		gameRoom.roomName.on(gameRoomEvents.connection, ctx => {
			const socket = ctx.socket;
			console.log('someone connect: %s', socket.id);
		});

		gameRoom.roomName.on(gameRoomEvents.joinRoom, (ctx, data) => {
			ctx.socket.emit(gameRoomEvents.message, {
				message: `Welcome to the ${ctx.data} lobby!`,
				userName: 'dev-bot',
				createdOn: new Date()
			});
		});

		gameRoom.roomName.on(gameRoomEvents.createGameMulti, async (ctx, data) => {
			const game = await Game.findOne({type: data.type, status: 'pending'});

			if(game) {
				const pendingGame = await joinPendingGame(game, data);
				ctx.socket.join(pendingGame.room);
				gameRoom.roomName.to(pendingGame.room).emit(gameRoomEvents.gameStarted, pendingGame);
			}

			if(!game) {
				const newGame = await createNewGame(data);
				ctx.socket.join(data.room);
				gameRoom.roomName.to(data.room).emit(gameRoomEvents.gameCreated, newGame);
			}
		});

		gameRoom.roomName.on(gameRoomEvents.gameCreatedSuccess, (ctx, data) => {
			console.log(`game room ${data.room} created by ${data.players[0].userName}`);
		});

		gameRoom.roomName.on(gameRoomEvents.gameStartedSuccess, (ctx, data) => {
			console.log(`game room ${data.room} joined by ${data.players[1].userName}`);
		});

		gameRoom.roomName.on(gameRoomEvents.leaveRoom, ctx => {
			gameRoom.roomName.broadcast(gameRoomEvents.message, {
				message: `${ctx.data} has left the room.`,
				userName: 'dev-bot',
				createOn: new Date()
			});
		});

		gameRoom.roomName.on(gameRoomEvents.disconnect, ctx => {
			console.log('disconnect called');
			console.log('user has left the room ' + ctx.data);
		});
	});
}

async function createNewGame(data) {
	const newGame = new Game({
		room: data.room,
		type: data.type,
		status: 'pending',
		players: []
	});
	newGame.players.push({userName: data.userName, status: 'joined'});
	newGame.save();
	return newGame;
}

async function joinPendingGame(game, data) {
	if(game) {
		let pendingGame = game;
		pendingGame.players.push({
			userName: data.userName,
			status: 'joined',
		});
		pendingGame.status = 'started';
		return await Game.findByIdAndUpdate(pendingGame._id, pendingGame, {new: true});
	}
}