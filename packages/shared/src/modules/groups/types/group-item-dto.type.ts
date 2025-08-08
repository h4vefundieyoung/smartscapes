import { type PermissionItemDto } from "../../permission/types/types.js";

type GroupItemDto = {
	id: number;
	key: string;
	name: string;
	permissions: PermissionItemDto[];
};

export { type GroupItemDto };
