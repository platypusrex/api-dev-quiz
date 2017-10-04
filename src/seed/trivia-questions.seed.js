import TriviaQuestion from '../models/question.model';
import { javascriptQuestions } from './javascript-questions.seed';

export const triviaQuestions = [
	...javascriptQuestions
];

export async function seedTriviaQuestions() {
	await TriviaQuestion.find().remove().exec();

	await Promise.all(
		triviaQuestions.map(question => {
			const q = new TriviaQuestion(question);
			q.save();
		})
	);
}