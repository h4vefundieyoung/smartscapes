import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useMemo } from "~/libs/hooks/hooks.js";
import {
	createAuthenticatedUserPatchValidationSchema,
	type UserAuthPatchRequestDto,
	type UserAuthResponseDto,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	onSubmit: (data: UserAuthPatchRequestDto) => void;
	user: UserAuthResponseDto;
};

const ProfileForm = ({ onSubmit, user }: Properties): React.JSX.Element => {
	const { firstName, lastName } = user;

	const authenticatedUserPatchValidationSchema = useMemo(() => {
		return createAuthenticatedUserPatchValidationSchema({
			firstName,
			lastName,
		});
	}, [firstName, lastName]);

	const { control, errors, handleSubmit } = useAppForm<UserAuthPatchRequestDto>(
		{
			defaultValues: {
				firstName,
				lastName,
			},
			mode: "onChange",
			validationSchema: authenticatedUserPatchValidationSchema,
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
			<Button label="Update profile" />
		</form>
	);
};

export { ProfileForm };
