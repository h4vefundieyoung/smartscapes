import { Button, Input, TextArea } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	pointOfInterestCreateValidationSchema,
	type PointsOfInterestRequestDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import styles from "./styles.module.css";

type Properties = {
	defaultLatitude: number;
	defaultLongitude: number;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: PointsOfInterestRequestDto) => void;
};

const CreatePOIModal = ({
	defaultLatitude,
	defaultLongitude,
	onSubmit,
}: Properties): React.JSX.Element => {
	const { control, errors, handleSubmit } =
		useAppForm<PointsOfInterestRequestDto>({
			defaultValues: {
				description: "",
				location: {
					coordinates: [defaultLongitude, defaultLatitude],
					type: "Point",
				},
				name: "",
			},
			validationSchema: pointOfInterestCreateValidationSchema,
		});

	const handleFormSubmit = (values: PointsOfInterestRequestDto): void => {
		onSubmit({
			...values,
			description: values.description || null,
			location: {
				...values.location,
				coordinates: values.location.coordinates,
			},
		});
	};

	return (
		<div>
			<h3 className={styles["title"]}>Create new POI</h3>
			<form
				className={styles["form"]}
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<Input
					autocomplete="name"
					control={control}
					errors={errors}
					label="Name"
					name="name"
					type="text"
				/>
				<TextArea
					control={control}
					errors={errors}
					label="Description (optional)"
					name="description"
				/>
				<div className={styles["footer"]}>
					<div>
						<Button label="Create" type="submit" />
					</div>
				</div>
			</form>
		</div>
	);
};

export { CreatePOIModal };
