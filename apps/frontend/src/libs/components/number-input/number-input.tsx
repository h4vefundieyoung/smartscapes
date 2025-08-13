import { type JSX } from "react";

import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";

import ArrowDown from "./assets/arrow-down.svg?react";
import ArrowUp from "./assets/arrow-up.svg?react";
import styles from "./styles.module.css";

type Properties = {
	initialValue?: number;
	max?: number;
	min?: number;
	onChange?: (value: number) => void;
};

const INITIAL_VALUE = 10;
const MAX_VALUE = 20;
const MIN_VALUE = 1;
const STEP_VALUE = 1;

const NumberInput = ({
	initialValue = INITIAL_VALUE,
	max = MAX_VALUE,
	min = MIN_VALUE,
	onChange,
}: Properties): JSX.Element => {
	const [value, setValue] = useState<number>(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const updateValue = useCallback(
		(newValue: number) => {
			setValue(newValue);
			onChange?.(newValue);
		},
		[onChange],
	);

	const handleIncrement = useCallback((): void => {
		updateValue(Math.min(max, value + STEP_VALUE));
	}, [value, max, updateValue]);

	const handleDecrement = useCallback((): void => {
		updateValue(Math.max(min, value - STEP_VALUE));
	}, [value, min, updateValue]);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = Number(event.target.value);

			if (!Number.isNaN(inputValue) && inputValue >= min && inputValue <= max) {
				updateValue(inputValue);
			} else if (Number.isNaN(inputValue)) {
				updateValue(min);
			}
		},
		[min, max, updateValue],
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
					<button
						className={styles["button"]}
						disabled={value >= max}
						onClick={handleIncrement}
						type="button"
					>
						<ArrowUp />
					</button>
					<button
						className={styles["button"]}
						disabled={value <= min}
						onClick={handleDecrement}
						type="button"
					>
						<ArrowDown />
					</button>
				</div>
			</div>
		</div>
	);
};

export { NumberInput };
