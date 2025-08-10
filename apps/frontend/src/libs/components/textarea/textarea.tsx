import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues, null>;
	errors: FieldErrors<TFieldValues>;
	label: string;
	maxLength?: number;
	name: FieldPath<TFieldValues>;
	placeholder?: string;
};

const TextArea = <TFieldValues extends FieldValues>({
	control,
	errors,
	label,
	maxLength,
	name,
	placeholder,
}: Properties<TFieldValues>): React.JSX.Element => {
	const { field } = useFormController({ control, name });

	const fieldError = (
		errors as unknown as Record<string, undefined | { message?: string }>
	)[name];

	return (
		<label className={styles["label"]}>
			<span className={styles["caption"]}>{label}</span>
			<textarea
				{...field}
				className={styles["textarea"]}
				maxLength={maxLength}
				placeholder={placeholder}
			/>
			{fieldError?.message && (
				<span className={styles["error"]}>{String(fieldError.message)}</span>
			)}
		</label>
	);
};

export { TextArea };
