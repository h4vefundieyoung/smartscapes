import * as changeCase from "change-case";

import { StringCaseType } from "../../enums/string-case-type.enum.js";

const changeStringCase = (string_: string, case_: string): string => {
	switch (case_) {
		case StringCaseType.CAMEL: {
			return changeCase.camelCase(string_);
		}

		case StringCaseType.CAPITAL: {
			return changeCase.capitalCase(string_);
		}

		case StringCaseType.CONSTANT: {
			return changeCase.constantCase(string_);
		}

		case StringCaseType.KEBAB: {
			return changeCase.kebabCase(string_);
		}

		case StringCaseType.PASCAL: {
			return changeCase.pascalCase(string_);
		}

		case StringCaseType.PASCAL_SNAKE: {
			return changeCase.pascalSnakeCase(string_);
		}

		case StringCaseType.PATH: {
			return changeCase.pathCase(string_);
		}

		case StringCaseType.TRAIN: {
			return changeCase.trainCase(string_);
		}

		default: {
			return string_;
		}
	}
};

export { changeStringCase };
