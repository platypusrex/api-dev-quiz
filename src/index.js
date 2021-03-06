import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'kcors';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './middleware/error-handler.middleware';
import { seedGameCategories } from './seed/game-categories.seed';
import { seedChatRooms } from './seed/chat.seed';
import { seedTriviaQuestions } from "./seed/trivia-questions.seed";
import { initializeChatRooms } from './utils/chat-rooms.util';
import { initialGameRooms } from './utils/game-rooms.util';
import { port, dbLocation } from './config';

mongoose.connect(dbLocation);
mongoose.connection.on('error', console.error);

seedGameCategories();
seedChatRooms();
seedTriviaQuestions();

const app = new Koa();

app
	.use(cors())
	.use(errorHandler)
	.use(logger())
	.use(bodyParser());

router(app);
initializeChatRooms(app);
initialGameRooms(app);

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));

export default app;