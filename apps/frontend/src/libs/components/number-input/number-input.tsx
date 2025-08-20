import { IconButton } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	onChange: (value: number) => void;
	range: {
		max: number;
		min: number;
	};
	value: number;
};

const STEP_VALUE = 1;

const NumberInput = ({
	onChange,
	range,
	value,
}: Properties): React.JSX.Element => {
	const handleIncrement = useCallback((): void => {
		const newValue = value + STEP_VALUE;
		onChange(newValue);
	}, [onChange, value]);

	const handleDecrement = useCallback((): void => {
		const newValue = value - STEP_VALUE;
		onChange(newValue);
	}, [onChange, value]);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = Number(event.target.value);

			onChange(inputValue);
		},
		[onChange],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["wrapper"]}>
				<input
					className={styles["input"]}
					onChange={handleInputChange}
					type="number"
					value={value}
				/>
				<div className={styles["buttons"]}>
					<IconButton
						className={styles["button"]}
						disabled={value >= range.max}
						icon="caretUp"
						label="Increase value"
						onClick={handleIncrement}
						size={8}
					/>
					<IconButton
						className={styles["button"]}
						disabled={value <= range.min}
						icon="caretDown"
						label="Decrease value"
						onClick={handleDecrement}
						size={8}
					/>
				</div>
			</div>
		</div>
	);
};

export { NumberInput };
