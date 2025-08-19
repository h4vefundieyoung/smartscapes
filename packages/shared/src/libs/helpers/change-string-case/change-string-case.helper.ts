import * as changeCase from "change-case";

import { StringCaseType } from "../../enums/enums.js";
import { type ValueOf } from "../../types/value-of.type.js";

const changeStringCase = (
	string_: string,
	caseType: ValueOf<typeof StringCaseType>,
): string => {
	return caseType === StringCaseType.CAMEL
		? changeCase.camelCase(string_)
		: string_;
};

export { changeStringCase };
