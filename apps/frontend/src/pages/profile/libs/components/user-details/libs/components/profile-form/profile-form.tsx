import { Button, Input } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	type UserAuthResponseDto,
	type UserProfilePatchRequestDto,
	userProfilePatchValidationSchema,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type ProfileFormProperties = {
	onSubmit: (data: UserProfilePatchRequestDto) => void;
	user: UserAuthResponseDto;
};

const ProfileForm = ({
	onSubmit,
	user,
}: ProfileFormProperties): React.JSX.Element => {
	const { firstName, lastName } = user;
	const { control, errors, handleSubmit } =
		useAppForm<UserProfilePatchRequestDto>({
			defaultValues: {
				firstName,
				lastName,
			},
			mode: "onChange",
			validationSchema: userProfilePatchValidationSchema,
		});

	return (
		<form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
			<Input
				control={control}
				errors={errors}
				label="First Name"
				name="firstName"
				type="text"
			/>
			<Input
				control={control}
				errors={errors}
				label="Last Name"
				name="lastName"
				type="text"
			/>
			<Button className={styles["form-button"]} label="Update My Settings" />
		</form>
	);
};

export { ProfileForm };
