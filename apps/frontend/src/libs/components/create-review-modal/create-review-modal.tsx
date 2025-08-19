import { useCallback } from "react";

import { Button, Modal, TextArea } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import { reviewCreateValidationSchema } from "~/modules/reviews/reviews.js";
import { type ReviewRequestDto } from "~/modules/reviews/reviews.js";

import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: ReviewRequestDto) => void;
	routeId: number;
};

const CreateReviewModal = ({
	isOpen,
	onClose,
	onSubmit,
	routeId,
}: Properties): React.JSX.Element => {
	const { control, errors, handleReset, handleSubmit } =
		useAppForm<ReviewRequestDto>({
			defaultValues: { content: "", poiId: null, routeId },
			validationSchema: reviewCreateValidationSchema,
		});

	const handleFormSubmit = (values: ReviewRequestDto): void => {
		onSubmit({
			content: values.content.trim(),
			poiId: null,
			routeId,
		});
		handleReset();
	};

	const handleClose = useCallback((): void => {
		handleReset();
		onClose();
	}, [handleReset, onClose]);

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<div className={styles["header"]}>
				<h3 className={styles["title"]}>Leave review</h3>
			</div>

			<form
				className={styles["form"]}
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<TextArea
					control={control}
					errors={errors}
					label="Comment"
					name="content"
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

export { CreateReviewModal };
