import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Icon } from "~/libs/components/icon/icon.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import { InteractiveIcon, StaticIcon } from "./libs/components/components.js";
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

	return (
		<label className={styles["label"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<span className={styles["input-container"]}>
				<input
					autoComplete={autocomplete}
					className={combineClassNames(
						styles["input"],
						hasError && styles["input-error"],
						iconRight && styles["input-icon-space"],
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
				{iconRight && (
					<span className={styles["icon-right"]}>
						{iconRight.onClick && iconRight.label ? (
							<InteractiveIcon
								label={iconRight.label}
								name={iconRight.name}
								onClick={iconRight.onClick}
							/>
						) : (
							<StaticIcon {...iconRight} />
						)}
					</span>
				)}
			</span>
		</label>
	);
};

export { Input };
