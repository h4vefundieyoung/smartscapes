import React from "react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import ReactSelect, { type MultiValue, type SingleValue } from "react-select";

import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import { type SelectOption } from "./libs/types/select-option.type.js";
import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues, TOptionValue = string> = {
	control: Control<TFieldValues, null>;
	isMulti?: boolean;
	label: string;
	name: FieldPath<TFieldValues>;
	options: SelectOption<TOptionValue>[];
	placeholder?: string;
};

const isMultiValue = <TOptionValue,>(
	value:
		| MultiValue<SelectOption<TOptionValue>>
		| SingleValue<SelectOption<TOptionValue>>,
): value is MultiValue<SelectOption<TOptionValue>> => {
	return Array.isArray(value);
};

const createHandleChange =
	<TOptionValue,>(
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

const classNames = {
	control: (): string => styles["control"] ?? "",
	menu: (): string => styles["menu"] ?? "",
	multiValue: (): string => styles["multi-value"] ?? "",
	multiValueLabel: (): string => styles["multi-value-label"] ?? "",
	multiValueRemove: (): string => styles["multi-value-remove"] ?? "",
	option: ({
		isFocused,
		isSelected,
	}: {
		isFocused: boolean;
		isSelected: boolean;
	}): string =>
		combineClassNames(
			styles["option"],
			isFocused && styles["option-focused"],
			isSelected && styles["option-selected"],
		),
	placeholder: (): string => styles["placeholder"] ?? "",
	singleValue: (): string => styles["single-value"] ?? "",
};

const Select = <TFieldValues extends FieldValues, TOptionValue = string>({
	control,
	isMulti = false,
	label,
	name,
	options,
	placeholder = "",
}: Properties<TFieldValues, TOptionValue>): React.JSX.Element => {
	const { field } = useFormController<TFieldValues>({ control, name });

	const rawValue = field.value as null | TOptionValue | TOptionValue[];
	const value = isMulti
		? options.filter((option) =>
				Array.isArray(rawValue) ? rawValue.includes(option.value) : false,
			)
		: (options.find((option) => option.value === rawValue) ?? null);

	const handleChange = React.useMemo(
		() => createHandleChange<TOptionValue>(field.onChange),
		[field.onChange],
	);

	return (
		<label className={styles["label"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<ReactSelect
				classNames={classNames}
				isMulti={isMulti}
				name={name}
				onChange={handleChange}
				options={options as PathValue<TFieldValues, Path<TFieldValues>>}
				placeholder={placeholder}
				unstyled
				value={value}
			/>
		</label>
	);
};

export { Select };
