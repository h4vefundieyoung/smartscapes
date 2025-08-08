import { type GroupItemDto } from "../../../groups/types/types.js";

type UserAuthResponseDto = {
	email: string;
	firstName: string;
	group: GroupItemDto;
	groupId: number;
	id: number;
	lastName: string;
};

export { type UserAuthResponseDto };
