import Router from 'koa-router';
import AuthController from '../controllers/auth.controller';

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;
