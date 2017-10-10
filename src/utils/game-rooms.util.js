import IO from 'koa-socket-2';
import Game from '../models/game.model';
import Question from '../models/question.model';
import { gameCategories } from '../seed/game-categories.seed';
import { gameRoomEvents, playerStatus, gameStatus, gameType } from "../constants/game-room.constants";

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

		gameRoom.roomName.on(gameRoomEvents.leaveRoom, ctx => {
			console.log('someone left the room');
			ctx.socket.disconnect();
		});

		onePlayerGameEventHandlers(gameRoom);
		twoPlayerGameEventHandlers(gameRoom);
		gameEventsHandlers(gameRoom);
	});
}

function onePlayerGameEventHandlers(gameRoom) {
	gameRoom.roomName.on(gameRoomEvents.createOnePlayerGame, async (ctx, data) => {
		const newGame = await createNewGame(data);
		ctx.socket.join(data.room);
		gameRoom.roomName.to(data.room).emit(gameRoomEvents.onePlayerGameCreated, newGame);
	});

	gameRoom.roomName.on(gameRoomEvents.onePlayerGameCreatedSuccess, (ctx, data) => {
		console.log(`One player game ${data.room} created by ${data.players[0].userName}`);
	});

	gameRoom.roomName.on(gameRoomEvents.cancelOnePlayerGame, async (ctx, data) => {
		await cancelGameInProgress(data);
		gameRoom.roomName.to(data.room).emit(gameRoomEvents.onePlayerGameCanceled, {
			userName: data.userName,
			message: gameRoomEvents.onePlayerGameCanceled,
			createdOn: new Date()
		});
		ctx.socket.disconnect();
	});
}

function twoPlayerGameEventHandlers(gameRoom) {
	gameRoom.roomName.on(gameRoomEvents.createTwoPlayerGame, async (ctx, data) => {
		const game = await Game.findOne({type: data.type, status: gameStatus.pending});

		if(game) {
			const pendingGame = await joinPendingGame(game, data);
			ctx.socket.join(pendingGame.room);
			gameRoom.roomName.to(pendingGame.room).emit(gameRoomEvents.twoPlayerGameStarted, pendingGame);
		}

		if(!game) {
			const newGame = await createNewGame(data);
			ctx.socket.join(data.room);
			gameRoom.roomName.to(data.room).emit(gameRoomEvents.twoPlayerGameCreated, newGame);
		}
	});

	gameRoom.roomName.on(gameRoomEvents.twoPlayerGameCreatedSuccess, (ctx, data) => {
		console.log(`Two player game ${data.room} created by ${data.players[0].userName}`);
	});

	gameRoom.roomName.on(gameRoomEvents.twoPlayerGameStartedSuccess, (ctx, data) => {
		console.log(`Two player game ${data.room} joined by ${data.players[1].userName}`);
	});

	gameRoom.roomName.on(gameRoomEvents.cancelTwoPlayerGame, async (ctx, data) => {
		await cancelGameInProgress(data);
		gameRoom.roomName.to(data.room).emit(gameRoomEvents.twoPlayerGameCanceled, {
			userName: data.userName,
			message: gameRoomEvents.twoPlayerGameCanceled,
			createdOn: new Date()
		});
		ctx.socket.disconnect();
	});

	// gameRoom.roomName.on(gameRoomEvents.leaveRoom, async (ctx, data) => {
	// 	console.log('leave room called');
	// 	await Game.findByIdAndRemove(data.id);
	// 	gameRoom.roomName.to(data.room).emit(gameRoomEvents.twoPlayerGameEnded, {
	// 		userName: data.userName,
	// 		message: `${data.userName} left the game`,
	// 		createdOn: new Date()
	// 	});
	// 	ctx.socket.leave(data.room);
	// 	gameRoom.roomName.broadcast(gameRoomEvents.message, {
	// 		message: `${ctx.data} left the room.`,
	// 		userName: 'dev-bot',
	// 		createdOn: new Date()
	// 	});
	// });
}

// _id: {$ne: data.id}}

function gameEventsHandlers(gameRoom) {
	gameRoom.roomName.on(gameRoomEvents.newQuestion, async (ctx, data) => {
		const count = await Question.count();
		const random = Math.floor(Math.random() * count);
		const question = await Question.findOne({category: data.category, _id: {$ne: data.id}}).skip(random);
		console.log('question', question);
		gameRoom.roomName.to(data.room).emit(gameRoomEvents.newQuestionSuccess, question);
	});
}

async function createNewGame(data) {
	const newGame = new Game({
		room: data.room,
		type: data.type,
		category: data.category,
		status: data.category === gameType.twoPlayer ? gameStatus.pending : gameStatus.started,
		players: []
	});
	newGame.players.push({userName: data.userName, status: playerStatus.joined});
	newGame.save();
	return newGame;
}

async function joinPendingGame(game, data) {
	if(game) {
		let pendingGame = game;
		pendingGame.players.push({
			userName: data.userName,
			status: playerStatus.joined,
		});
		pendingGame.status = gameStatus.started;
		return await Game.findByIdAndUpdate(pendingGame._id, pendingGame, {new: true});
	}
}

async function cancelGameInProgress (data) {
	return await Game.findById(data.id, (err, doc) => {
		doc.status = data.status;
		if (doc.status === gameStatus.cancelled) {
			doc.players.map(player => {
				if (player.userName === data.userName) {
					player.status = playerStatus.cancelled;
				}
			});
		}
		doc.save();
	});
}