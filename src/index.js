import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'kcors';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './middleware/error-handler.middleware';
import { seedGameCategories } from './seed/game-categories.seed';
import { seedChatRooms } from './seed/chat.seed';
import { initializeChatRooms } from './utils/chat-rooms.util';
import { port, dbLocation } from './config';

mongoose.connect(dbLocation);
seedGameCategories();
seedChatRooms();
mongoose.connection.on('error', console.error);

const app = new Koa();

app
	.use(cors())
	.use(errorHandler)
	.use(logger())
	.use(bodyParser());

router(app);
initializeChatRooms(app);

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));

export default app;