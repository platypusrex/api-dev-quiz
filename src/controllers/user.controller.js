import User from '../models/user.model';
import { hashPassword } from '../utils/hash.util';

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

class UserController {
	async findById(ctx) {
		const user = await User.findById(ctx.params.id);

		ctx.assert(user, 404, 'User not found');
		ctx.body = user;
	}

	async updateById(ctx) {
		try {
			const user = await User.findByIdAndUpdate(`${ctx.params.id}`, ctx.request.body, { new: true });

			ctx.assert(user, 404, 'User not found');
			ctx.body = user;
		} catch(err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.assert(false, 404, 'User not found');
			}

			if (err.name === 'MongoError' && err.code === 11000) {
				ctx.assert(false, 401, 'Username must be unique');
			}

			ctx.throw(500);
		}

		// if(password) {
		// 	let passwordHash = await hashPassword(password);
		// 	ctx.assert(passwordHash, 400, 'Error updating password');
		//
		// 	user.password = passwordHash;
		// }
	}

	async removeById(ctx) {
		const user = await User.findByIdAndRemove(ctx.params.id);

		ctx.assert(user, 404, 'Error removing user');
		ctx.body = `Successfully removed user with id: ${ctx.params.id}`;
	}

	async getUsers(ctx) {
		if(ctx.request.query.search) {
			const regex = new RegExp(escapeRegex(ctx.request.query.search), 'gi');
			const users = await User.find(
				{$or: [
						{ $text: { $search: ctx.request.query.search }},
						{ userName: { $regex: regex }}
				]},
				'userName title _id'
			);

			ctx.body = users;
		}
	}
}

export default new UserController();