import { type MultiValue, type SingleValue } from "react-select";

import { type SelectOption } from "../../types/select-option.type.js";

const isMultiValue = <TOptionValue>(
	value:
		| MultiValue<SelectOption<TOptionValue>>
		| SingleValue<SelectOption<TOptionValue>>,
): value is MultiValue<SelectOption<TOptionValue>> => {
	return Array.isArray(value);
};

export { isMultiValue };
