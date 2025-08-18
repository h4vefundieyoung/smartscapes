import { type GroupItemWithPermissionsDto } from "../../../groups/types/types.js";

type UserAuthResponseDto = {
	avatarUrl: null | string;
	email: string;
	firstName: string;
	group: GroupItemWithPermissionsDto;
	groupId: number;
	id: number;
	lastName: string;
};

export { type UserAuthResponseDto };
