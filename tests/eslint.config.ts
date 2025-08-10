import { type Linter } from "eslint";

import baseConfig from "../eslint.config.js";

const config = [...baseConfig] satisfies Linter.Config[];

export default config;
