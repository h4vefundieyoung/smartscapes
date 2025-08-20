import React from "react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import ReactSelect, {
	type InputActionMeta,
	type MultiValue,
	type SingleValue,
} from "react-select";

import { useFormController, useMemo } from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";

import { selectStylesConfig } from "./libs/constants/constants.js";
import { getSelectNewValue, mapSelectValue } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues, TOptionValue = string> = {
	control: Control<TFieldValues, null>;
	isLoading?: boolean;
	isMulti?: boolean;
	label: string;
	name: FieldPath<TFieldValues>;
	onChange?: (
		newValue:
			| MultiValue<SelectOption<TOptionValue>>
			| SingleValue<SelectOption<TOptionValue>>,
	) => void;
	onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
	options: SelectOption<TOptionValue>[];
	placeholder?: string;
};

const Select = <TFieldValues extends FieldValues, TOptionValue = string>({
	control,
	isLoading,
	isMulti = false,
	label,
	name,
	onChange,
	onInputChange,
	options,
	placeholder = "",
}: Properties<TFieldValues, TOptionValue>): React.JSX.Element => {
	const { field } = useFormController<TFieldValues>({ control, name });

	const value = useMemo(() => {
		const rawValue = (field.value ?? []) as TOptionValue[];

		return mapSelectValue<TOptionValue>(rawValue, options);
	}, [field.value, options]);

	const handleChange = useMemo((): ((
		newValue:
			| MultiValue<SelectOption<TOptionValue>>
			| SingleValue<SelectOption<TOptionValue>>,
	) => void) => {
		return (newValue) => {
			const cleanValue = getSelectNewValue(newValue);
			field.onChange(cleanValue);
		};
	}, [field]);

	return (
		<label className={styles["label"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<ReactSelect
				classNames={selectStylesConfig}
				isLoading={isLoading}
				isMulti={isMulti}
				name={name}
				onChange={onChange ?? handleChange}
				{...(onInputChange ? { onInputChange } : {})}
				options={options as PathValue<TFieldValues, Path<TFieldValues>>}
				placeholder={placeholder}
				unstyled
				value={value}
			/>
		</label>
	);
};

export { Select };
