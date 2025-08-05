import { type SelectOption } from "../types/select-option.type.js";

const mapSelectValue = <TOptionValue>(
	rawValue: null | TOptionValue | TOptionValue[],
	options: SelectOption<TOptionValue>[],
	isMulti: boolean,
): SelectOption<TOptionValue>[] => {
	if (isMulti) {
		return Array.isArray(rawValue)
			? options.filter((option) => rawValue.includes(option.value))
			: [];
	}

	const found = options.find((option) => option.value === rawValue);

	return found ? [found] : [];
};

export { mapSelectValue };
