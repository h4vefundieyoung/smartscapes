import React from "react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import ReactSelect from "react-select";

import { useFormController } from "~/libs/hooks/hooks.js";

import { selectClassNames } from "./libs/constants/constants.js";
import { createHandleChange } from "./libs/helpers/helpers.js";
import { mapSelectValue } from "./libs/mappers/mappers.js";
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
	const value = mapSelectValue<TOptionValue>(rawValue, options, isMulti);
	const handleChange = React.useMemo(
		() => createHandleChange<TOptionValue>(field.onChange),
		[field.onChange],
	);

	return (
		<label className={styles["label"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<ReactSelect
				classNames={selectClassNames}
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
