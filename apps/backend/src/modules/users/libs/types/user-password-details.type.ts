import { type GroupItemWithPermissionsDto } from "@smartscapes/shared";

type UserPasswordDetails = {
	firstName: string;
	group: GroupItemWithPermissionsDto;
	groupId: number;
	id: number;
	lastName: string;
	passwordHash: string;
	passwordSalt: string;
};

export { type UserPasswordDetails };
