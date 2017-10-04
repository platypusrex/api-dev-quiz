import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playerSchema = new Schema({
	userName: String,
	status: String,
	socket: Object
});

const gameSchema = new Schema({
	room: String,
	category: String,
	type: String,
	status: String,
	createdOn: Date,
	players: [playerSchema]
});

gameSchema.pre('save', function(next) {
	const now = new Date();
	if(!this.createdOn) {
		this.createdOn = now;
	}
	next();
});

export default mongoose.model('Game', gameSchema);