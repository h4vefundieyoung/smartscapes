import { type KnipConfig } from "knip";

const config: KnipConfig = {
	workspaces: {
		".": {
			entry: ["./dangerfile.ts"],
		},
		"apps/backend": {
			entry: ["src/db/migrations/*.ts", "knexfile.ts"],
			ignore: ["src/modules/points-of-interest/**"],
			ignoreDependencies: ["pg"],
		},
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"packages/shared": {
			entry: [],
			ignore: ["src/**/**", "src/modules/points-of-interest/**"],
			includeEntryExports: true,
		},
	},
};

export default config;
