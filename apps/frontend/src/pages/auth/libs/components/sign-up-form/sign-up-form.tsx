import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpFormValues,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm = ({ onSubmit }: Properties): React.JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpFormValues>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		mode: "onChange",
		validationSchema: userSignUpValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserSignUpFormValues) => {
				const payload: UserSignUpRequestDto = {
					email: formData.email,
					firstName: formData.firstName,
					lastName: formData.lastName,
					password: formData.password,
				};
				onSubmit(payload);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={styles["container"]}>
			<h1 className={styles["form__title"]}>Sign Up</h1>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<div className={styles["form__group"]}>
					<Input
						control={control}
						errors={errors}
						label="First Name"
						name="firstName"
						placeholder="Enter your first name"
						type="text"
					/>
				</div>

				<div className={styles["form__group"]}>
					<Input
						control={control}
						errors={errors}
						label="Last Name"
						name="lastName"
						placeholder="Enter your last name"
						type="text"
					/>
				</div>

				<div className={styles["form__group"]}>
					<Input
						control={control}
						errors={errors}
						label="Email"
						name="email"
						placeholder="Enter your email"
						type="email"
					/>
				</div>

				<div className={styles["form__group"]}>
					<Input
						control={control}
						errors={errors}
						label="Password"
						name="password"
						placeholder="Enter your password"
						type="password"
					/>
				</div>

				<div className={styles["form__group"]}>
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

			<div className={styles["login-link__container"]}>
				<p className={styles["login-link__text"]}>
					Already have an account?
					<Link to={AppRoute.SIGN_IN}>Log in</Link>
				</p>
			</div>
		</div>
	);
};

export { SignUpForm };
