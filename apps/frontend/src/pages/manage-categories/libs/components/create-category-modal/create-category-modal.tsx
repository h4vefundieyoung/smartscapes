import { Button, Input, Modal } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	type CategoryCreateRequestDto,
	categoryCreateValidationSchema,
} from "~/modules/categories/categories.js";

import { DEFAULT_CREATE_CATEGORY_PAYLOAD } from "./libs/constants/constants.js";
import { type CreateCategoryFormValues } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (payload: CategoryCreateRequestDto) => void;
};

const CreateCategoryModal = ({
	isOpen,
	onClose,
	onSubmit,
}: Properties): React.JSX.Element => {
	const { control, errors, handleReset, handleSubmit } =
		useAppForm<CreateCategoryFormValues>({
			defaultValues: DEFAULT_CREATE_CATEGORY_PAYLOAD,
			validationSchema: categoryCreateValidationSchema,
		});

	const handleFormSubmit = (payload: CreateCategoryFormValues): void => {
		onSubmit(payload as CategoryCreateRequestDto);
		handleReset(DEFAULT_CREATE_CATEGORY_PAYLOAD);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h3 className={styles["title"]}>Create new category</h3>
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
				<div className={styles["button"]}>
					<Button label="Create" type="submit" />
				</div>
			</form>
		</Modal>
	);
};

export { CreateCategoryModal };
