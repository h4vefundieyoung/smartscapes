import React from "react";
import { type FieldErrors } from "react-hook-form";

import {
	Button,
	Input,
	MapLocationField,
	MapProvider,
	Modal,
	TextArea,
} from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import {
	pointOfInterestCreateValidationSchema,
	type PointsOfInterestRequestDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { DEFAULT_CREATE_POI_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (payload: PointsOfInterestRequestDto) => void;
};

const CreatePOIModal = ({
	isOpen,
	onClose,
	onSubmit,
}: Properties): React.JSX.Element => {
	const { control, errors, handleReset, handleSubmit } =
		useAppForm<PointsOfInterestRequestDto>({
			defaultValues: DEFAULT_CREATE_POI_PAYLOAD,
			validationSchema: pointOfInterestCreateValidationSchema,
		});

	const handleFormSubmit = (payload: PointsOfInterestRequestDto): void => {
		onSubmit(payload);
		handleReset(DEFAULT_CREATE_POI_PAYLOAD);
	};

	const handleFormError = (
		formErrors: FieldErrors<PointsOfInterestRequestDto>,
	): void => {
		for (const error of Object.values(formErrors)) {
			if (error.message) {
				toastNotifier.showError(error.message);
			}
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={styles["header"]}>
				<h3 className={styles["title"]}>Create new POI</h3>
			</div>
			<form
				className={styles["form"]}
				onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
			>
				<Input
					autocomplete="name"
					control={control}
					errors={errors}
					label="Name"
					name="name"
					type="text"
				/>
				<div className={styles["map-field"]}>
					<span className={styles["label-caption"]}>Location</span>
					<div className={styles["map-section"]}>
						<MapProvider>
							<MapLocationField control={control} name="location" />
						</MapProvider>
					</div>
				</div>
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
		</Modal>
	);
};

export { CreatePOIModal };
