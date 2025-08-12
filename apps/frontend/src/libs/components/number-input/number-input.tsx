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

const NumberInput = ({
	initialValue = INITIAL_VALUE,
	max = MAX_VALUE,
	min = MIN_VALUE,
	onChange,
}: Properties): JSX.Element => {
	const [value, setValue] = useState<number>(initialValue);

	const handleIncrement = useCallback((): void => {
		setValue((previousValue) => {
			const newValue = Math.min(max, ++previousValue);

			if (onChange) {
				onChange(newValue);
			}

			return newValue;
		});
	}, [onChange, max]);

	const handleDecrement = useCallback(() => {
		setValue((previousValue) => {
			const newValue = Math.max(min, --previousValue);

			if (onChange) {
				onChange(newValue);
			}

			return newValue;
		});
	}, [min, onChange]);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = Number.parseInt(event.target.value, 10);

			if (!Number.isNaN(inputValue) && inputValue >= min && inputValue <= max) {
				setValue(inputValue);

				if (onChange) {
					onChange(inputValue);
				}
			} else if (Number.isNaN(inputValue)) {
				setValue(min);

				if (onChange) {
					onChange(min);
				}
			}
		},
		[min, max, onChange],
	);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

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
