import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import { Icon } from "../components.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
};

const ICON_SIZE = 24;

const TextArea = <T extends FieldValues>({
	control,
	errors,
	label,
	name,
	placeholder = "",
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
				value={field.value ?? ""}
			/>
			{hasError && (
				<span className={styles["error"]}>
					<Icon height={ICON_SIZE} name="error" width={ICON_SIZE} />
					{error}
				</span>
			)}
		</label>
	);
};

export { TextArea };
