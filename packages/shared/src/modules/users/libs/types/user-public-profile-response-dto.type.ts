import { type UserAuthResponseDto } from "./user-auth-response-dto.type.js";

type UserPublicProfileResponseDto = Pick<
	UserAuthResponseDto,
	"firstName" | "id" | "lastName"
> & {
	followersCount: number;
	isFollowed: boolean;
};

export { type UserPublicProfileResponseDto };
