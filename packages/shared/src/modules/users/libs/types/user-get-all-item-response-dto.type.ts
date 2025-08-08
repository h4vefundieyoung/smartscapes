import { type GroupItemDto } from "../../../groups/types/types.js";

type UserGetByIdItemResponseDto = {
	email: string;
	firstName: string;
	group: GroupItemDto;
	groupId: number;
	id: number;
	lastName: string;
};

export { type UserGetByIdItemResponseDto };
