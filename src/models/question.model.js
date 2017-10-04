import mongoose from 'mongoose';
import { gameCategoryKeys } from '../seed/game-categories.seed';

const categories = gameCategoryKeys;
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	question: String,
	codeSnippet: {
		type: String,
		required: false
	},
	choices: [String],
	answer: String,
	category: {
		type: String,
		required: true,
		enum: categories
	}
});

export default mongoose.model('Question', questionSchema);