import { type UserSignUpRequestDto } from "./user-sign-up-request-dto.type.js";

type UserSignUpFormValues = UserSignUpRequestDto & {
	repeatPassword: string;
};

export { type UserSignUpFormValues };
