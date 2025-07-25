import { type UserSignUpRequestDto } from "@smartscapes/shared";

type UserSignUpFormValues = UserSignUpRequestDto & {
	confirmPassword: string;
};

export { type UserSignUpFormValues };
