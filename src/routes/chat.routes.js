import Router from 'koa-router';
import ChatController from '../controllers/chat.controller';

const basePath = '/chat_rooms';
const router = new Router;

router
	.prefix(basePath)
	.get('/', ChatController.getChatRoomMessages);

export default router;