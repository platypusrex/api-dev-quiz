import { sign, verify } from 'jsonwebtoken'
import { secret } from '../config';

export async function signToken(user) {
	return await sign(user, secret, {
		expiresIn: '30d'
	});
}

export async function verifyToken(token) {
	return await verify(token, secret);
}