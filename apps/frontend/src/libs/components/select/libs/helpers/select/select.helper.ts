import { type MultiValue, type SingleValue } from "react-select";

import { type SelectOption } from "../../types/types.js";
import { isMultiValue } from "../helpers.js";

const createHandleChange =
	<TOptionValue>(
		onChange: (value: null | TOptionValue | TOptionValue[]) => void,
	) =>
	(
		newValue:
			| MultiValue<SelectOption<TOptionValue>>
			| SingleValue<SelectOption<TOptionValue>>,
	): void => {
		if (isMultiValue<TOptionValue>(newValue)) {
			const values = newValue.map((o) => o.value);
			onChange(values);
		} else {
			const single = newValue?.value ?? null;
			onChange(single);
		}
	};

export { createHandleChange };
