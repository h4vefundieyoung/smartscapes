import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm = ({ onSubmit }: Properties): React.JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserSignInRequestDto) => {
				onSubmit(formData);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={styles["container"]}>
			<h1 className={styles["form__title"]}>Log In</h1>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<div className={styles["form__group"]}>
					<Input
						control={control}
						errors={errors}
						label="Email"
						name="email"
						placeholder=""
						type="email"
					/>
				</div>

				<div className={styles["form__group"]}>
					<Input
						control={control}
						errors={errors}
						label="Password"
						name="password"
						placeholder=""
						type="text"
					/>
				</div>

				<Button label="Log In" type="submit" />
			</form>

			<div className={styles["sign-up-link__container"]}>
				<p className={styles["sign-up-link__text"]}>
					Do not have an account? <Link to={AppRoute.SIGN_UP}>Sign up</Link>
				</p>
			</div>
		</div>
	);
};

export { SignInForm };
