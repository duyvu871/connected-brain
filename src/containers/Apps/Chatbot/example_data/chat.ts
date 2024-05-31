const sections = [
	{
		id: 'section-1',
		title: 'Section 1',
		messages: [1, 2, 3, 4, 5],
	},
	{
		id: 'section-2',
		title: 'Section 2',
		messages: [6, 7, 8, 9, 10],
	},
	{
		id: 'section-3',
		title: 'Section 3',
		messages: [11, 12, 13, 14, 15],
	},
	{
		id: 'section-4',
		title: 'Section 4',
		messages: [16, 17, 18, 19, 20],
	},
	{
		id: 'section-5',
		title: 'Section 5',
		messages: [21, 22, 23, 24, 25],
	},
];

const messages = [
	{
		id: 1,
		section_id: 'section-1',
		message: 'The error "invalid file pattern" usually occurs when you\'re using a wildcard pattern in a command (like the `protoc` command) and the pattern you provided doesn\'t match any files or is not a valid wildcard expression.\n' +
			'\n' +
			'Here are the most common reasons for this error and how to fix them:\n' +
			'\n' +
			'**1. Incorrect Wildcard Pattern:**\n' +
			'\n' +
			'   - **Check for typos:**  Make sure there are no spelling errors in your wildcard pattern, especially in the directory names and file extensions.\n' +
			'   - **Case Sensitivity:** File paths and wildcards are often case-sensitive. Make sure your pattern matches the actual file names and directory structure.\n' +
			'\n' +
			'**2. File Doesn\'t Exist:**\n' +
			'\n' +
			'   - **Verify File Existence:** Double-check that the files you are trying to match with the wildcard actually exist in the specified directory.\n' +
			'   - **Hidden Files:**  If you are trying to match hidden files (files that start with a "."), you need to explicitly include them in your wildcard pattern. \n' +
			'\n' +
			'**3. Wrong Directory:**\n' +
			'\n' +
			'   - **Current Working Directory:** The command is likely executing in a different directory than you expect. Use the full path to the `.proto` files or change the current working directory using `cd` before running the command.\n' +
			'\n' +
			'**4. Special Characters in File Paths:**\n' +
			'\n' +
			'   - **Spaces and Special Characters:**  If your file or directory names have spaces or special characters (like !, @, #, $, %, ^, &, *, (, ), +, =, {, }, [, ], |, \\, :, ;, ", \', <, >, ?, /), enclose the entire path in quotes:\n' +
			'      ```bash\n' +
			'      protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \\\n' +
			'             --ts_out="service=grpc-web:src/proto" \\\n' +
			'             "src/path with spaces/*.proto" \n' +
			'      ```\n' +
			'\n' +
			'**5. Invalid Wildcard Characters:**\n' +
			'\n' +
			'   - **Supported Wildcard Characters:** Make sure you are using only supported wildcard characters:\n' +
			'      - `*`: Matches any sequence of characters.\n' +
			'      - `?`: Matches any single character.\n' +
			'      - `[characters]`: Matches any one character within the brackets (e.g., `[abc]` matches a, b, or c).\n' +
			'\n' +
			'**Example Fixes:**\n' +
			'\n' +
			'* **Incorrect path:**\n' +
			'   ```bash\n' +
			'   # Incorrect:\n' +
			'   protoc --ts_out="service=grpc-web:src/proto" srcc/**/*.proto\n' +
			'\n' +
			'   # Correct:\n' +
			'   protoc --ts_out="service=grpc-web:src/proto" src/**/*.proto\n' +
			'   ```\n' +
			'* **File doesn\'t exist:**\n' +
			'   ```bash\n' +
			'   # Incorrect:\n' +
			'   protoc --ts_out="service=grpc-web:src/proto" src/**/*.proto3\n' +
			'\n' +
			'   # Correct (assuming the files have the .proto extension):\n' +
			'   protoc --ts_out="service=grpc-web:src/proto" src/**/*.proto \n' +
			'   ```\n' +
			'* **Space in directory name:**\n' +
			'   ```bash\n' +
			'   # Incorrect:\n' +
			'   protoc --ts_out="service=grpc-web:src/proto" src/my protos/*.proto\n' +
			'\n' +
			'   # Correct:\n' +
			'   protoc --ts_out="service=grpc-web:src/proto" "src/my protos/*.proto"\n' +
			'   ```\n' +
			'\n' +
			'If you\'ve checked all these points and are still facing the "invalid file pattern" error, provide the exact command you are using, the directory structure of your project, and the operating system you are working on so I can assist you further. \n',
	},
	{
		id: 2,
		section_id: 'section-1',
		message: 'How are you?',
	},
	{
		id: 3,
		section_id: 'section-1',
		message: 'I am fine',
	},
	{
		id: 4,
		section_id: 'section-1',
		message: 'What about you?',
	},
	{
		id: 5,
		section_id: 'section-1',
		message: 'I am good too',
	},
	{
		id: 6,
		section_id: 'section-2',
		message: 'Hello',
	},
	{
		id: 7,
		section_id: 'section-2',
		message: 'How are you?',
	},
	{
		id: 8,
		section_id: 'section-2',
		message: 'I am fine',
	},
	{
		id: 9,
		section_id: 'section-2',
		message: 'What about you?',
	},
	{
		id: 10,
		section_id: 'section-2',
		message: 'I am good too',
	},
	{
		id: 11,
		section_id: 'section-3',
		message: 'Hello',
	},
	{
		id: 12,
		section_id: 'section-3',
		message: 'How are you?',
	},
	{
		id: 13,
		section_id: 'section-3',
		message: 'I am fine',
	},
	{
		id: 14,
		section_id: 'section-3',
		message: 'What about you?',
	},
	{
		id: 15,
		section_id: 'section-3',
		message: 'I am good too',
	},
	{
		id: 16,
		section_id: 'section-4',
		message: 'Hello',
	},
	{
		id: 17,
		section_id: 'section-4',
		message: 'How are you?',
	},
	{
		id: 18,
		section_id: 'section-4',
		message: 'I am fine',
	},
	{
		id: 19,
		section_id: 'section-4',
		message: 'What about you?',
	},
	{
		id: 20,
		section_id: 'section-4',
		message: 'I am good too',
	},
	{
		id: 21,
		section_id: 'section-5',
		message: 'Hello',
	},
	{
		id: 22,
		section_id: 'section-5',
		message: 'How are you?',
	},
	{
		id: 23,
		section_id: 'section-5',
		message: 'I am fine',
	},
	{
		id: 24,
		section_id: 'section-5',
		message: 'What about you?',
	},
	{
		id: 25,
		section_id: 'section-5',
		message: 'I am good too',
	},
];

export {
	sections,
	messages,
};
