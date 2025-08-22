import { type GroupItemWithPermissionsDto } from "../../../groups/types/types.js";

type UserAuthResponseDto = {
	avatarUrl: null | string;
	email: string;
	firstName: string;
	group: GroupItemWithPermissionsDto;
	groupId: number;
	id: number;
	isVisibleProfile: boolean;
	lastName: string;
};

export { type UserAuthResponseDto };
