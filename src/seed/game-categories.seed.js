import GameCategories from '../models/game-categories.model';

const gameCategories = {
	java: {
		type: 'java',
		displayName: 'Java',
		icon: 'icon-java-bold',
		color: 'rgb(237, 29, 36)'
	},
	cSharp: {
		type: 'cSharp',
		displayName: 'C#',
		icon: 'icon-csharp',
		color: 'rgb(105, 0, 129)'
	},
	c: {
		type: 'c',
		displayName: 'C',
		icon: 'icon-c',
		color: 'rgb(89, 111, 197)'
	},
	cPlusPlus: {
		type: 'cPlusPlus',
		displayName: 'C++',
		icon: 'icon-cplusplus',
		color: 'rgb(103, 153, 209)'
	},
	javascript: {
		type: 'javascript',
		displayName: 'Javascript',
		icon: 'icon-javascript',
		color: 'rgb(240, 219, 79)'
	},
	python: {
		type: 'python',
		displayName: 'Python',
		icon: 'icon-python',
		color: 'rgb(55, 115, 65)'
	},
	php: {
		type: 'php',
		displayName: 'PHP',
		icon: 'icon-php',
		color: 'rgb(119, 123, 179)'
	},
	elixir: {
		type: 'elixir',
		displayName: 'Elixir',
		icon: 'icon-elixir',
		color: 'rgb(72, 34, 90)'
	},
	objectiveC: {
		type: 'objectiveC',
		displayName: 'Objective-C',
		icon: 'icon-objc',
		color: 'rgb(0 ,0 ,0)'
	},
	ruby: {
		type: 'ruby',
		displayName: 'Ruby',
		icon: 'icon-ruby',
		color: 'rgb(171, 21, 1)'
	},
	go: {
		type: 'go',
		displayName: 'GoLang',
		icon: 'icon-go',
		color: 'rgb(97, 218, 253)'
	},
	sql: {
		type: 'sql',
		displayName: 'SQL',
		icon: 'icon-database-alt2'
	},
	scala: {
		type: 'scala',
		displayName: 'Scala',
		icon: 'icon-scala',
		color: 'rgb(222, 50, 47)'
	},
	elm: {
		type: 'elm',
		displayName: 'Elm',
		icon: 'icon-elm',
		color: 'rgb(96, 181, 204)'
	},
	haskell: {
		type: 'haskell',
		displayName: 'Haskell',
		icon: 'icon-haskell',
		color: 'rgb(102, 102, 102)'
	},
	perl: {
		type: 'perl',
		displayName: 'Perl',
		icon: 'icon-perl',
		color: 'rgb(73, 98, 132)'
	},
	erlang: {
		type: 'erlang',
		displayName: 'Erlang',
		icon: 'icon-erlang',
		color: 'rgb(138, 5, 49)'
	},
	clojure: {
		type: 'clojure',
		displayName: 'Clojure',
		icon: 'icon-clojure',
		color: 'rgb(150, 202, 75)'
	},
	css: {
		type: 'css',
		displayName: 'CSS',
		icon: 'icon-css3',
		color: 'rgb(51, 169, 220)'
	},
	html: {
		type: 'html',
		displayName: 'HTML',
		icon: 'icon-html5',
		color: 'rgb(241, 102, 42)'
	}
};

export function seedGameCategories() {
	GameCategories.findOne().remove().exec();

	new GameCategories(gameCategories).save();
}