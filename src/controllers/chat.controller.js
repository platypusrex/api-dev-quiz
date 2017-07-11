import Chat from '../models/chat.model';

class ChatController {
	async getChatRoomMessages(ctx) {
		const roomName = ctx.request.query.roomName;
		if(!roomName) {
			ctx.assert(404, 'Chat room not found');
		}
		ctx.body = await Chat.find({roomName});
	}
}

export default new ChatController();