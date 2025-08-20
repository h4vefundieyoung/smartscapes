import * as changeCase from "change-case";

const changeStringCase = (string_: string): string => {
	return changeCase.camelCase(string_);
};

export { changeStringCase };
