import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserGamesSchema = new Schema({
	total: Number,
	won: Number,
	lost: Number
});

const LocationSchema = new Schema({
	city: String,
	state: String,
	country: String
});

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true,
		unique: true,
		index: true,
		trim: true
	},
	title: {
		type: String,
		maxlength: 30
	},
	description: {
		type: String,
		maxlength: 140
	},
	createdOn: {
		type: Date
	},
	lastActive: {
		type: Date
	},
	following: [
		{
			userId: {
				type: String
			}
		}
	],
	followers: [
		{
			userId: {
				type: String
			}
		}
	],
	games: [UserGamesSchema]
});

UserSchema.index({
	userName: 'text'
});

UserSchema.pre('save', function(next) {
	const now = new Date();
	this.lastActive = now;

	if(!this.createdOn) {
		this.createdOn = now;
	}
	next();
});

UserSchema.post('save', function(error, doc, next) {
	if (error.name === 'MongoError' && error.code === 11000) {
		next(new Error('Username and email must be unique'));
	} else {
		next(error);
	}
});

export default mongoose.model('User', UserSchema);