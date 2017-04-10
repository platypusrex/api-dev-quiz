import User from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { signToken } from '../utils/jwt.util';

class AuthController {
	async register(ctx) {
		let user = new User(ctx.request.body);
		let password = await hashPassword(user.password);

		ctx.assert(password, 400, 'Error saving password');
		user.password = password;

		const token = await signToken(user);
		ctx.assert(token, 400, 'Error creating token');

		const newUser = await user.save();
		ctx.assert(newUser, 400, 'Error creating account');

		ctx.body = {
			token: token,
			user: newUser
		};
	}

	async login(ctx) {
		const { email, password } = ctx.request.body;

		if(email && password) {
			const user = await User.findOne({email}).exec();

			if(user) {
				const confirmPassword = await comparePassword(password, user.password);
				const token = await signToken(user);

				if(confirmPassword) {
					user.lastActive = new Date();
					user.save();

					ctx.body = {
						token: token,
						user: user
					}
				} else {
					ctx.throw(401, 'Email/Password incorrect');
				}

			} else {
				ctx.throw(401, 'User not found');
			}
		} else {
			ctx.throw(401, 'Email and Password are required')
		}
	}
}

export default new AuthController();