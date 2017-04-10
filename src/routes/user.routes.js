import Router from 'koa-router';
import { assertToken, assertUser } from '../middleware/auth.middleware';
import UserController from '../controllers/user.controller';

const basePath = '/users';
const router = new Router();

router
	.prefix(basePath)
	.get('/:id', assertToken, assertUser, UserController.findById)
	.put('/:id', assertToken, assertUser, UserController.updateById)
	.delete('/:id', assertToken, assertUser, UserController.removeById);

export default router;