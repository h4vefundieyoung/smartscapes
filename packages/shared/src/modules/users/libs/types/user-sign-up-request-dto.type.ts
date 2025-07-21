type UserSignUpRequestDto = {
	email: string;
	firstName: string;
	lastName?: string | undefined;
	password: string;
};

export { type UserSignUpRequestDto };
