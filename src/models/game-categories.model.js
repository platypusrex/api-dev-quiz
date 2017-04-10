import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	type: {
		type: String
	},
	displayName: {
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
	swift: CategorySchema,
	objectiveC: CategorySchema,
	ruby: CategorySchema,
	go: CategorySchema,
	sql: CategorySchema,
	scala: CategorySchema,
	lisp: CategorySchema,
	haskell: CategorySchema,
	perl: CategorySchema,
	r: CategorySchema,
	matlab: CategorySchema,
	scratch: CategorySchema,
	bash: CategorySchema
});

export default mongoose.model('GameCategories', GameCategorySchema);