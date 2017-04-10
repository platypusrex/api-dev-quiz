export default async (ctx, next) => {
	try {
		await next();
	} catch(err) {
		console.error('error:', err);
		ctx.body = {
			type: 'error',
			message: err.message
		};
		ctx.status = err.status || 500;
	}
}