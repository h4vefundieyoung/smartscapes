import { type GroupItemWithPermissionsDto } from "~/modules/groups/libs/types/types.js";

type UserDetailsWithPassword = {
	avatarUrl: null | string;
	email: string;
	firstName: string;
	group: GroupItemWithPermissionsDto;
	groupId: number;
	id: number;
	isVisibleProfile: boolean;
	lastName: string;
	passwordHash: string;
	passwordSalt: string;
};

export { type UserDetailsWithPassword };
