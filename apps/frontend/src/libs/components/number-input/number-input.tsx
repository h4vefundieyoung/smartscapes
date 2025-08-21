import { IconButton } from "~/libs/components/components.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";

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
const MIN_INPUT_WIDTH = 16;
const CHAR_WIDTH = 8;

const NumberInput = ({
	onChange,
	range,
	value,
}: Properties): React.JSX.Element => {
	const [localValue, setLocalValue] = useState<string>(value.toString());
	const inputWidth = Math.max(localValue.length * CHAR_WIDTH, MIN_INPUT_WIDTH);

	const handleIncrement = useCallback((): void => {
		const newValue = Math.min(value + STEP_VALUE, range.max);
		onChange(newValue);
	}, [onChange, value, range.max]);

	const handleDecrement = useCallback((): void => {
		const newValue = Math.max(value - STEP_VALUE, range.min);
		onChange(newValue);
	}, [onChange, value, range.min]);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setLocalValue(event.target.value);
		},
		[],
	);

	const appliedValue = useCallback(() => {
		const inputValue = Number(localValue);

		if (Number.isNaN(inputValue) || !inputValue) {
			setLocalValue(value.toString());
		} else {
			let clampedValue = inputValue;

			if (inputValue > range.max) {
				clampedValue = range.max;
			}

			if (inputValue < range.min) {
				clampedValue = range.min;
			}

			onChange(clampedValue);
			setLocalValue(clampedValue.toString());
		}
	}, [localValue, onChange, range.max, range.min, value]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				appliedValue();
			}
		},
		[appliedValue],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["wrapper"]}>
				<input
					className={styles["input"]}
					onBlur={appliedValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					style={{ width: inputWidth }}
					type="number"
					value={localValue}
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
