import { Button, Input, Link } from "~/libs/components/components.js";
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

type SignUpFormValues = UserSignUpRequestDto & {
	repeatPassword: string;
};

const SignUpForm = ({ onSubmit }: Properties): React.JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<SignUpFormValues>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD as SignUpFormValues,
		validationSchema: userSignUpValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: SignUpFormValues) => {
				const payload: UserSignUpRequestDto = {
					email: formData.email,
					firstName: formData.firstName,
					lastName: formData.lastName === "" ? undefined : formData.lastName,
					password: formData.password,
				};
				onSubmit(payload);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={styles["container form-wrapper"]}>
			<h1 className={styles["form-title"]}>Sign Up</h1>
			<form onSubmit={handleFormSubmit}>
				<div className={styles["form-group"]}>
					<Input
						control={control}
						errors={errors}
						label="First Name"
						name="firstName"
						placeholder=""
						type="text"
					/>
				</div>

				<div className={styles["form-group"]}>
					<Input
						control={control}
						errors={errors}
						label="Last Name"
						name="lastName"
						placeholder=""
						type="text"
					/>
				</div>

				<div className={styles["form-group"]}>
					<Input
						control={control}
						errors={errors}
						label="Email"
						name="email"
						placeholder=""
						type="email"
					/>
				</div>

				<div className={styles["form-group"]}>
					<Input
						control={control}
						errors={errors}
						label="Password"
						name="password"
						placeholder=""
						type="text"
					/>
				</div>

				<div className={styles["form-group"]}>
					<Input
						control={control}
						errors={errors}
						label="Confirm password"
						name="repeatPassword"
						placeholder=""
						type="text"
					/>
				</div>

				<Button label="Sign up" type="submit" />
			</form>

			<div className={styles["login-link-container"]}>
				<p className={styles["login-text"]}>
					Already have an account?
					<Link to={AppRoute.SIGN_IN}>Log in</Link>
				</p>
			</div>
		</div>
	);
};

export { SignUpForm };
