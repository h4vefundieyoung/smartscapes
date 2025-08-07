import { Button, Input } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	type UserAuthResponseDto,
	type UserAuthPatchRequestDto,
	userAuthPatchValidationSchema,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type ProfileFormProperties = {
	onSubmit: (data: UserAuthPatchRequestDto) => void;
	user: UserAuthResponseDto;
};

const ProfileForm = ({
	onSubmit,
	user,
}: ProfileFormProperties): React.JSX.Element => {
	const { firstName, lastName } = user;
	const { control, errors, handleSubmit } = useAppForm<UserAuthPatchRequestDto>(
		{
			defaultValues: {
				firstName,
				lastName,
			},
			mode: "onChange",
			validationSchema: userAuthPatchValidationSchema,
		},
	);

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
			<Button label="Update My Settings" />
		</form>
	);
};

export { ProfileForm };
