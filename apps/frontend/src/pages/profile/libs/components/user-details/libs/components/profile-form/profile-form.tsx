import { Button, Input } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import { userProfileValidationSchema } from "~/modules/users/libs/validation-schemas/validation-schemas.js";

import styles from "./styles.module.css";

type UserProfile = {
	firstName: string;
	lastName: string;
};

const DEFAULT_PROFILE_PAYLOAD: UserProfile = {
	firstName: "",
	lastName: "",
};

const ProfileForm = (): React.JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<UserProfile>({
		defaultValues: DEFAULT_PROFILE_PAYLOAD,
		mode: "onChange",
		validationSchema: userProfileValidationSchema,
	});

	const onSubmit = (data: UserProfile): void => {
		// eslint-disable-next-line no-console
		console.log(data);
	};

	return (
		<form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
			<Input
				autocomplete="given-name"
				control={control}
				errors={errors}
				label="First Name"
				name="firstName"
				placeholder="Enter your first name"
				type="text"
			/>
			<Input
				autocomplete="family-name"
				control={control}
				errors={errors}
				label="Last Name"
				name="lastName"
				placeholder="Enter your last name"
				type="text"
			/>
			<Button label="Update my settings" />
		</form>
	);
};

export { ProfileForm };
