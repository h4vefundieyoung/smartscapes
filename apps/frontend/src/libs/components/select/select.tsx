import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import ReactSelect, {
	type DropdownIndicatorProps,
	type GroupBase,
	type InputActionMeta,
	type MultiValue,
	type SingleValue,
} from "react-select";

import { useFormController, useMemo } from "~/libs/hooks/hooks.js";
import { type IconName, type SelectOption } from "~/libs/types/types.js";

import { CustomDropdownIndicator } from "./libs/components/components.js";
import {
	selectIconLeftStylesConfig,
	selectStylesConfig,
} from "./libs/constants/constants.js";
import { getSelectNewValue, mapSelectValue } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues, TOptionValue = string> = {
	control: Control<TFieldValues, null>;
	iconLeft?: IconName;
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
	iconLeft,
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

	const customComponents = useMemo(() => {
		if (!iconLeft) {
			return {};
		}

		return {
			DropdownIndicator: (
				properties: DropdownIndicatorProps<
					SelectOption<TOptionValue>,
					boolean,
					GroupBase<SelectOption<TOptionValue>>
				>,
			): React.JSX.Element => (
				<CustomDropdownIndicator<TOptionValue>
					{...properties}
					iconName={iconLeft}
				/>
			),
		};
	}, [iconLeft]);

	const selectStyles = useMemo(() => {
		if (!iconLeft) {
			return selectStylesConfig;
		}

		return { ...selectStylesConfig, ...selectIconLeftStylesConfig };
	}, [iconLeft]);

	return (
		<label className={styles["label"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<ReactSelect
				classNames={selectStyles}
				components={customComponents}
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
