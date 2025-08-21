import { type UserAuthResponseDto } from "../../../users/users.js";

type ReviewGetByIdResponseDto = {
	content: string;
	id: number;
	likesCount: number;
	poiId: null | number;
	routeId: null | number;
	user: Pick<
		UserAuthResponseDto,
		"avatarUrl" | "firstName" | "id" | "lastName"
	>;
};

export { type ReviewGetByIdResponseDto };
