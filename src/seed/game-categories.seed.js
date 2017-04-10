import GameCategories from '../models/game-categories.model';

const gameCategories = {
	java: {
		type: 'java',
		displayName: 'Java'
	},
	cSharp: {
		type: 'cSharp',
		displayName: 'C#'
	},
	c: {
		type: 'c',
		displayName: 'C'
	},
	cPlusPlus: {
		type: 'cPlusPlus',
		displayName: 'C++'
	},
	javascript: {
		type: 'javascript',
		displayName: 'Javascript'
	},
	python: {
		type: 'python',
		displayName: 'Python'
	},
	php: {
		type: 'php',
		displayName: 'PHP'
	},
	swift: {
		type: 'swift',
		displayName: 'Swift'
	},
	objectiveC: {
		type: 'objectiveC',
		displayName: 'Objective-C'
	},
	ruby: {
		type: 'ruby',
		displayName: 'Ruby'
	},
	go: {
		type: 'go',
		displayName: 'GoLang'
	},
	sql: {
		type: 'sql',
		displayName: 'SQL'
	},
	scala: {
		type: 'scala',
		displayName: 'Scala'
	},
	lisp: {
		type: 'lisp',
		displayName: 'Lisp'
	},
	haskell: {
		type: 'haskell',
		displayName: 'Haskell'
	},
	perl: {
		type: 'perl',
		displayName: 'Perl'
	},
	r: {
		type: 'r',
		displayName: 'R'
	},
	matlab: {
		type: 'matlab',
		displayName: 'MATLAB'
	},
	scratch: {
		type: 'scratch',
		displayName: 'Scratch'
	},
	bash: {
		type: 'bash',
		displayName: 'Bash'
	}
};

export function seedGameCategories() {
	GameCategories.findOne().remove().exec();

	new GameCategories(gameCategories).save();
}