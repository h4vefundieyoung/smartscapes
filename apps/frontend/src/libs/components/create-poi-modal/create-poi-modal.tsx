import {
	Button,
	Input,
	Modal,
	TextArea,
} from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import { pointOfInterestCreateValidationSchema } from "~/modules/points-of-interest/points-of-interest.js";

import {
	type FormFields,
	type LocalPointGeometry,
} from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	defaultLatitude: number;
	defaultLongitude: number;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: {
		description: null | string;
		location: LocalPointGeometry;
		name: string;
	}) => void;
};

const CreatePOIModal = ({
	defaultLatitude,
	defaultLongitude,
	isOpen,
	onClose,
	onSubmit,
}: Properties): React.JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<FormFields>({
		defaultValues: {
			description: "",
			location: {
				coordinates: [defaultLongitude, defaultLatitude].map(String) as [
					string,
					string,
				],
				type: "Point",
			},
			name: "",
		},
		validationSchema: pointOfInterestCreateValidationSchema,
	});

	const handleFormSubmit = (values: FormFields): void => {
		onSubmit({
			description: values.description || null,
			location: {
				coordinates: values.location.coordinates.map(String) as [
					string,
					string,
				],
				type: "Point",
			},
			name: values.name,
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={styles["header"]}>
				<h3 className={styles["title"]}>Create new POI</h3>
			</div>

			<form
				className={styles["form"]}
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<div className={styles["field"]}>
					<Input
						autocomplete="name"
						control={control}
						errors={errors}
						label="Name"
						name="name"
						type="text"
					/>
				</div>
				<div className={styles["field"]}>
					<TextArea
						control={control}
						errors={errors}
						label="Description (optional)"
						name="description"
					/>
				</div>

				<div className={styles["footer"]}>
					<div className="button">
						<Button label="Create" type="submit" />
						<div />
					</div>
				</div>
			</form>
		</Modal>
	);
};

export { CreatePOIModal };
