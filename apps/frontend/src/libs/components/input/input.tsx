import { useCallback, useState } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Icon } from "~/libs/components/icon/icon.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import { ToggleVisionButton } from "./libs/components/toggle-vision-button/toggle-vision-button.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	autocomplete?: HTMLInputElement["autocomplete"];
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	autocomplete = "on",
	control,
	errors,
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): React.JSX.Element => {
	const [typeState, setTypeState] = useState<Properties<never>["type"]>(type);
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const isPasswordButtonShown =
		(type === "password" && typeState === "password") ||
		(typeState === "text" && field.value);

	const handlePasswordAppearanceToggle = useCallback((): void => {
		const state: "password" | "text" =
			typeState === "password" ? "text" : "password";

		setTypeState(state);
	}, [typeState, setTypeState]);

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
					type={typeState}
					value={field.value}
				/>
				{hasError && (
					<span className={styles["error"]}>
						<Icon height={24} name="error" width={24} />
						{error as string}
					</span>
				)}
				{isPasswordButtonShown && (
					<ToggleVisionButton
						onAppearanceToggle={handlePasswordAppearanceToggle}
						type={typeState}
					/>
				)}
			</span>
		</label>
	);
};

export { Input };
