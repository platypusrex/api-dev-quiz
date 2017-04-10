import { verifyToken } from '../utils/jwt.util';

export async function assertToken(ctx, next) {
	const token = ctx.request.body.token || ctx.request.query.token || ctx.request.headers['x-access-token'];
	ctx.assert(token, 403, 'No token provided');
	const verified = await verifyToken(token);
	ctx.state.user = verified._doc;
	await next();
}

export async function assertUser(ctx, next) {
	if(ctx.state.user._id === ctx.params.id) {
		await next();
	} else {
		ctx.throw(400, 'Authentication error');
	}
}