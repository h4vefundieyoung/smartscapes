import { type UserSignUpFormValues } from "~/modules/users/users.js";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpFormValues = {
	email: "",
	firstName: "",
	lastName: "",
	password: "",
	repeatPassword: "",
};

export { DEFAULT_SIGN_UP_PAYLOAD };
