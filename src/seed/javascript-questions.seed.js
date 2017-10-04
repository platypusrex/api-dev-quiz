import { gameCategories } from '../seed/game-categories.seed';

export const javascriptQuestions = [
	{
		question: 'JavaScript is ideal to',
		choices: [
			'make computations in HTML simpler',
			'minimize storage requirements on the web server',
			'increase the download time for the client',
			'None of the mentioned'
		],
		answer: 'minimize storage requirements on the web server',
		category: gameCategories.javascript.type
	},
	{
		question: 'Which attribute is used to specify that the script is executed when the page has finished parsing?',
		choices: [
			'parse',
			'async',
			'defer',
			'type'
		],
		answer: 'defer',
		category: gameCategories.javascript.type
	},
	{
		question: 'JavaScript code can be called by using',
		choices: [
			'RMI',
			'Triggering Event',
			'Preprocessor',
			'Function/Method'
		],
		answer: 'Function/Method',
		category: gameCategories.javascript.type
	},
	{
		question: 'Which of the following attributes is used to include external JS code inside your HTML document?',
		choices: [
			'src',
			'ext',
			'script',
			'link'
		],
		answer: 'src',
		category: gameCategories.javascript.type
	},
	{
		question: 'A proper scripting language is a',
		choices: [
			'High level programming language',
			'Assembly level programming language',
			'Machine level programming language',
			'Low level programming language'
		],
		answer: 'High level programming language',
		category: gameCategories.javascript.type
	},
	{
		question: 'Which of the following is not considered as an error in JavaScript?',
		choices: [
			'Syntax error',
			'Missing of semicolons',
			'Division by zero',
			'All of the above'
		],
		answer: 'Division by zero',
		category: gameCategories.javascript.type
	},
	{
		question: 'The escape sequence ‘\\f’ stands for',
		choices: [
			'Floating numbers',
			'Representation of functions that returns a value',
			'\\f is not present in JavaScript',
			'Form feed'
		],
		answer: 'Form feed',
		category: gameCategories.javascript.type
	},
	{
		question: 'Assume that we have to convert “false” that is a non-string to string. The command that we use is',
		choices: [
			'false.toString()',
			'String(false)',
			'String newVariable = ”false”',
			'Both a and b'
		],
		answer: 'Both a and b',
		category: gameCategories.javascript.type
	},
	{
		question: 'A function definition expression can be called',
		choices: [
			'Function prototype',
			'Function literal',
			'Function definition',
			'Function declaration'
		],
		answer: 'Function literal',
		category: gameCategories.javascript.type
	},
	{
		question: 'What kind of an expression is “new Point(2,3)”?',
		choices: [
			'Primary Expression',
			'Object Creation Expression',
			'Invocation Expression',
			'Constructor Calling Expression'
		],
		answer: 'minimize storage requirements on the web server',
		category: gameCategories.javascript.type
	},
	{
		question: 'In order to check if the pattern matches with the string “text”, the statement is',
		codeSnippet: 'var text = "testing: 1, 2, 3"; // Sample text\n' +
		'var pattern = /\\d+/g // Matches all instances of one or more digits',
		choices: [
			'text == pattern',
			'text.equals(pattern)',
			'text.test(pattern)',
			'pattern.test(text)'
		],
		answer: 'pattern.test(text)',
		category: gameCategories.javascript.type
	}
];