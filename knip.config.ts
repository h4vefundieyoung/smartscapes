import { type KnipConfig } from "knip";

const config: KnipConfig = {
	ignoreBinaries: ["playwright"],
	workspaces: {
		".": {
			entry: ["./dangerfile.ts"],
		},
		"apps/backend": {
			entry: ["src/db/migrations/*.ts", "knexfile.ts"],
			ignoreDependencies: ["pg"],
		},
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"packages/shared": {
			entry: ["build/index.js"],
			ignore: ["src/**/**"],
			includeEntryExports: true,
		},
		"tests": {
			entry: ["tests/**/*.spec.ts"],
			ignoreDependencies: ["ajv"],
		},
	},
};

export default config;
