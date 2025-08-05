import { type UserAuthResponseDto } from "./user-auth-response-dto.type.js";

type UserSignUpResponseDto = {
	token: string;
	user: Pick<UserAuthResponseDto, "email" | "id">;
};

export { type UserSignUpResponseDto };
