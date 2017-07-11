import Router from 'koa-router';
import GamesController from '../controllers/games.controller';

const basePath = '/games';
const router = new Router();

router
	.prefix(basePath)
	.get('/', GamesController.getGameCategories);

export default router;