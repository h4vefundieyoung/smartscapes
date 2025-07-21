import { type UserSignUpRequestDto } from "~/modules/users/users.js";

type SignUpFormValues = UserSignUpRequestDto & {
	repeatPassword: string;
};

const DEFAULT_SIGN_UP_PAYLOAD: SignUpFormValues = {
	email: "",
	firstName: "",
	lastName: "",
	password: "",
	repeatPassword: "",
};

export { DEFAULT_SIGN_UP_PAYLOAD };
