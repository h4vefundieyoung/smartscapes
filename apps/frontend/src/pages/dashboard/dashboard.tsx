import { Carousel, Loader, Select } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const Dashboard = (): React.JSX.Element => {
	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];

	const { control } = useAppForm<FormValues>({
		defaultValues: { multiColors: [], singleColor: null },
	});

	return (
		<main className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Loader />
				<div className={styles["carousel-container"]}>
					<Carousel images={[""]} />
				</div>
				<div className={styles["select-container"]}>
					<Select
						control={control}
						label="Single select"
						name="singleColor"
						options={colorOptions}
					/>
					<Select
						control={control}
						isMulti
						label="Multi select"
						name="multiColors"
						options={colorOptions}
					/>
				</div>
			</div>
		</main>
	);
};

export { Dashboard };
