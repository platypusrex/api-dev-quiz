import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	type: {
		type: String
	},
	displayName: {
		type: String
	},
	icon: {
		type: String
	},
	color: {
		type: String
	}
});


const GameCategorySchema = new Schema({
	java: CategorySchema,
	cSharp: CategorySchema,
	c: CategorySchema,
	cPlusPlus: CategorySchema,
	javascript: CategorySchema,
	python: CategorySchema,
	php: CategorySchema,
	elixir: CategorySchema,
	objectiveC: CategorySchema,
	ruby: CategorySchema,
	go: CategorySchema,
	sql: CategorySchema,
	scala: CategorySchema,
	elm: CategorySchema,
	haskell: CategorySchema,
	perl: CategorySchema,
	erlang: CategorySchema,
	clojure: CategorySchema,
	css: CategorySchema,
	html: CategorySchema
});

export default mongoose.model('GameCategories', GameCategorySchema);