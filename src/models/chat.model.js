import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	createdOn: Date,
	message: String,
	userName: String,
	nameSpace: String
});

ChatSchema.pre('save', function(next) {
	const now = new Date();
	if(!this.createdOn) {
		this.createdOn = now;
	}
	next();
});

export default mongoose.model('Chat', ChatSchema);