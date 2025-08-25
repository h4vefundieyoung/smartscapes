import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { FieldError } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import { DEFAULT_ROWS_COUNT } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	rowsCount?: number;
};

const TextArea = <T extends FieldValues>({
	control,
	errors,
	label,
	name,
	placeholder = "",
	rowsCount = DEFAULT_ROWS_COUNT,
}: Properties<T>): React.JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message as string | undefined;
	const hasError = Boolean(error);

	return (
		<label className={styles["label"]}>
			<span className={styles["label-caption"]}>{label}</span>
			<textarea
				className={combineClassNames(
					styles["textarea"],
					hasError && styles["textarea-error"],
				)}
				name={field.name}
				onChange={field.onChange}
				placeholder={placeholder}
				rows={rowsCount}
				value={field.value ?? ""}
			/>
			{hasError && <FieldError description={error as string} />}
		</label>
	);
};

export { TextArea };
