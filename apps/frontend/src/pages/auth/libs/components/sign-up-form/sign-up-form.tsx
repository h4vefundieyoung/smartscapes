import {
	Button,
	Input,
	PasswordInput,
	TextLink,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm = ({ onSubmit }: Properties): React.JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		mode: "onChange",
		validationSchema: userSignUpValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserSignUpRequestDto) => {
				onSubmit(formData);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={styles["container"]}>
			<h1 className={styles["form-title"]}>Sign Up</h1>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<Input
					autocomplete="given-name"
					control={control}
					errors={errors}
					label="First Name"
					name="firstName"
					type="text"
				/>
				<Input
					autocomplete="family-name"
					control={control}
					errors={errors}
					label="Last Name"
					name="lastName"
					type="text"
				/>
				<Input
					autocomplete="email"
					control={control}
					errors={errors}
					label="Email"
					name="email"
					type="email"
				/>
				<PasswordInput
					autocomplete="new-password"
					control={control}
					errors={errors}
					label="Password"
					name="password"
				/>
				<PasswordInput
					autocomplete="new-password"
					control={control}
					errors={errors}
					label="Confirm password"
					name="confirmPassword"
				/>
				<Button label="Sign up" type="submit" />
			</form>

			<div>
				<p className={styles["login-link-text"]}>
					Already have an account?&nbsp;
					<TextLink to={AppRoute.SIGN_IN}>Log in</TextLink>
				</p>
			</div>
		</div>
	);
};

export { SignUpForm };
