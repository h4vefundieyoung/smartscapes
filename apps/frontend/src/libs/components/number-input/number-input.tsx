import { IconButton } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	max: number;
	min: number;
	onChange?: (value: number) => void;
	value: number;
};

const STEP_VALUE = 1;

const NumberInput = ({
	max,
	min,
	onChange,
	value,
}: Properties): React.JSX.Element => {
	const handleIncrement = useCallback((): void => {
		const newValue = Math.min(max, (value || min) + STEP_VALUE);
		onChange?.(newValue);
	}, [max, min, onChange, value]);

	const handleDecrement = useCallback((): void => {
		const newValue = Math.max(min, (value || min) - STEP_VALUE);
		onChange?.(newValue);
	}, [min, onChange, value]);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = Number(event.target.value);
			const isNotNumber = Number.isNaN(inputValue);
			const isMoreThanMin = inputValue >= min;
			const isLessThanMax = inputValue <= max;

			if (!isNotNumber && isMoreThanMin && isLessThanMax) {
				onChange?.(inputValue);
			} else if (isNotNumber) {
				onChange?.(min);
			}
		},
		[max, min, onChange],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["wrapper"]}>
				<input
					className={styles["input"]}
					max={max}
					min={min}
					onChange={handleInputChange}
					type="number"
					value={value}
				/>
				<div className={styles["buttons"]}>
					<IconButton
						className={styles["button"]}
						disabled={value >= max}
						hiddenLabel="Increase value"
						icon="caretUp"
						onClick={handleIncrement}
						size={8}
					/>
					<IconButton
						className={styles["button"]}
						disabled={value <= min}
						hiddenLabel="Increase value"
						icon="caretDown"
						onClick={handleDecrement}
						size={8}
					/>
				</div>
			</div>
		</div>
	);
};

export { NumberInput };
