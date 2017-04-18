import Koa from 'koa';
import IO from 'koa-socket';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'kcors';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './middleware/error-handler.middleware';
import { seedGameCategories } from './seed/game-categories.seed';
import { port, dbLocation } from './config';

mongoose.connect(dbLocation);
seedGameCategories();
mongoose.connection.on('error', console.error);

const app = new Koa();
const io = new IO();

io.attach(app);

app
	.use(cors())
	.use(errorHandler)
	.use(logger())
	.use(bodyParser());

router(app);

io.on('connection', ctx => {
	console.log('client connected');
});

io.on( 'message', ( ctx, data ) => {
	console.log('context', ctx);
	console.log('client', ctx.socket.socket.client.server.eio);
	console.log( `message: ${ data }` )
});

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));

export default app;