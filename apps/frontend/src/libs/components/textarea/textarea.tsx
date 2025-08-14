import { forwardRef, type ComponentPropsWithRef } from "react";

import styles from "./styles.module.css";

type Properties = ComponentPropsWithRef<"textarea"> & {
	hasError?: boolean;
	isDisabled?: boolean;
	label?: string;
	placeholder?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, Properties>(
	(
		{
			className,
			hasError = false,
			isDisabled = false,
			label,
			placeholder = "",
			...rest
		},
		reference,
	): React.JSX.Element => {
		return (
			<label className={styles["container"]}>
				{label && <span className={styles["label"]}>{label}</span>}
				<textarea
					{...rest}
					className={`${styles["textarea"]} ${hasError ? styles["error"] : ""} ${className ?? ""}`}
					disabled={isDisabled}
					placeholder={placeholder}
					ref={reference}
				/>
			</label>
		);
	},
);

Textarea.displayName = "Textarea";

export { Textarea };
