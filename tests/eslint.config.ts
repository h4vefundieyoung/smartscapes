import { type Linter } from "eslint";

import baseConfig from "../eslint.config.js";

const overridesConfig = {
	files: ["**/*.ts"],
	rules: {
		"@typescript-eslint/no-magic-numbers": ["off"],
	},
} satisfies Linter.Config;

const config = [...baseConfig, overridesConfig] satisfies Linter.Config[];

export default config;
