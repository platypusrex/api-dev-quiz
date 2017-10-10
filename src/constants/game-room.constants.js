import { defaultSocketEvents } from "./socket-events.constants";

export const gameStatus = {
	pending: 'pending',
	started: 'started',
	cancelled: 'cancelled',
	timedOut: 'timedOut'
};

export const gameType = {
	onePlayer: 'onePlayer',
	twoPlayer: 'twoPlayer'
};

export const playerStatus = {
	joined: 'joined',
	cancelled: 'cancelled'
};

const gameEvents = {
	newQuestion: 'newQuestion',
	newQuestionSuccess: 'newQuestionSuccess'
};

const onePlayerGameEvents = {
	createOnePlayerGame: 'createOnePlayerGame',
	cancelOnePlayerGame: 'cancelOnePlayerGame',
	onePlayerGameCreated: 'onePlayerGameCreated',
	onePlayerGameCreatedSuccess: 'onePlayerGameCreatedSuccess',
	onePlayerGameCanceled: 'onePlayerGameCanceled',
	onePlayerGameEnded: 'onePlayerGameEndedSuccess'
};

const twoPlayerGameEvents = {
	createTwoPlayerGame: 'createTwoPlayerGame',
	cancelTwoPlayerGame: 'cancelTwoPlayerGame',
	twoPlayerGameCreated: 'twoPlayerGameCreated',
	twoPlayerGameCreatedSuccess: 'twoPlayerGameCreatedSuccess',
	twoPlayerGameStarted: 'twoPlayerGameStarted',
	twoPlayerGameStartedSuccess: 'twoPlayerGameStartedSuccess',
	twoPlayerGameCanceled: 'twoPlayerGameCanceled',
	twoPlayerGameEnded: 'twoPlayerGameEndedSuccess',
	leaveTwoPlayerGameRoom: 'leaveTwoPlayerGameRoom'
};

export const gameRoomEvents =
	Object.assign({}, defaultSocketEvents, onePlayerGameEvents, twoPlayerGameEvents, gameEvents);