import { type UserAuthResponseDto } from "./user-auth-response-dto.type.js";

type UserSignInResponseDto = {
	token: string;
	user: Pick<UserAuthResponseDto, "email" | "id">;
};

export { type UserSignInResponseDto };
