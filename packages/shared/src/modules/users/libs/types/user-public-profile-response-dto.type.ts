import { type UserAuthResponseDto } from "./user-auth-response-dto.type.js";

type UserPublicProfileResponseDto = Pick<
	UserAuthResponseDto,
	"avatarUrl" | "firstName" | "id" | "isVisibleProfile" | "lastName"
> & {
	followersCount: number;
	isFollowed: boolean;
};

export { type UserPublicProfileResponseDto };
