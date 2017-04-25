import User from '../models/user.model';
import { options } from '../config';
import * as _ from 'lodash';
import { hashPassword } from '../utils/hash.util';

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function flattenFollowingArray(arr) {
	return arr.map(val => { return val.userId});
}

async function checkForFollowingUpdate(id, user) {
	const currentUser = await User.findById(id);

	if(user.following && user.following.length > currentUser.following.length) {
		const id = _.difference(flattenFollowingArray(user.following), flattenFollowingArray(currentUser.following))[0];
		const followedUser = await User.findById(id);
		followedUser.followers.push({userId: currentUser._id, userName: currentUser.userName, title: currentUser.title});

		await User.findByIdAndUpdate(`${id}`, followedUser, { new: true });
	}
}

class UserController {
	async findById(ctx) {
		const user = await User.findById(ctx.params.id, options.standard);

		ctx.assert(user, 404, 'User not found');
		ctx.body = user;
	}

	async updateById(ctx) {
		try {
			checkForFollowingUpdate(ctx.params.id, ctx.request.body);
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
			const users = await User.find({
				$or: [
						{ $text: { $search: ctx.request.query.search }},
						{ userName: { $regex: regex }}
				]
			}, options.userSearch);

			ctx.body = users;
		}
	}
}

export default new UserController();