import { type MouseEvent } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Icon } from "~/libs/components/icon/icon.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	autocomplete?: HTMLInputElement["autocomplete"];
	control: Control<T, null>;
	errors: FieldErrors<T>;
	iconRight?: {
		label?: string;
		name: IconName;
		onClick?: () => void;
	};
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	autocomplete = "on",
	control,
	errors,
	iconRight,
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): React.JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const isIconRightInteractive = Boolean(iconRight?.onClick);

	const handleIconClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			iconRight?.onClick?.();
		},
		[iconRight],
	);

	const iconComponent = iconRight && (
		<span className={styles["input-button-icon"]}>
			<Icon height={24} name={iconRight.name} width={24} />
		</span>
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
						iconRight && styles["input-iconed"],
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
				{iconRight && !isIconRightInteractive && iconComponent}
				{iconRight && isIconRightInteractive && (
					<button
						className={styles["icon-button"]}
						onMouseDown={handleIconClick}
						type="button"
					>
						<span className="visually-hidden">
							{iconRight.label || "input icon-button"}
						</span>
						{iconComponent}
					</button>
				)}
			</span>
		</label>
	);
};

export { Input };
