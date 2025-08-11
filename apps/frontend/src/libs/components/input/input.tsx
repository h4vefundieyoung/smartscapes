import { type MouseEvent, useCallback } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Icon } from "~/libs/components/icon/icon.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/icon-name.type.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	autocomplete?: HTMLInputElement["autocomplete"];
	control: Control<T, null>;
	errors: FieldErrors<T>;
	icon?: IconName;
	label: string;
	name: FieldPath<T>;
	onIconClick?: () => void;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	autocomplete = "on",
	control,
	errors,
	icon,
	label,
	name,
	onIconClick,
	placeholder = "",
	type = "text",
}: Properties<T>): React.JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const handleIconClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			if (onIconClick) {
				onIconClick();
			}
		},
		[onIconClick],
	);

	return (
		<label className={styles["label"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<span className={styles["input-container"]}>
				<input
					autoComplete={autocomplete}
					className={combineClassNames(
						styles["input"],
						hasError && styles["input-error"],
					)}
					name={field.name}
					onChange={field.onChange}
					placeholder={placeholder}
					type={type}
					value={field.value}
				/>
				{hasError && (
					<span className={styles["error"]}>
						<Icon height={24} name="error" width={24} />
						{error as string}
					</span>
				)}
				{icon && (
					<button
						className={styles["input-button"]}
						onMouseDown={handleIconClick}
						type="button"
					>
						<span className="visually-hidden">input icon-button</span>
						<Icon
							className={styles["input-button-icon"] || ""}
							height={24}
							name={icon}
							width={24}
						/>
					</button>
				)}
			</span>
		</label>
	);
};

export { Input };
