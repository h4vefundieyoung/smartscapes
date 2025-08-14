import baseConfig from "../lint-staged.config.js";

/** @type {import('lint-staged').Configuration} */
const config = {
	...baseConfig,
	"**/*.ts": [
		() => "npm run lint:js -w tests",
		() => "npm run lint:types -w tests",
	],
};

export default config;
