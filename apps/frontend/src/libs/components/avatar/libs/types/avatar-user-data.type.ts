import { type UserAuthResponseDto } from "~/modules/users/users.js";

type AvatarUserData = Pick<
	UserAuthResponseDto,
	"avatarUrl" | "firstName" | "id" | "lastName"
>;

export { type AvatarUserData };
