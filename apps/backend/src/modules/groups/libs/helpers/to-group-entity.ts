import { PermissionEntity } from "../../../permission/permission.entity.js";
import { GroupEntity } from "../../group.entity.js";
import { type GroupModel } from "../../group.model.js";

const toGroupEntity = (model: GroupModel): GroupEntity => {
	return GroupEntity.initializeWithPermissions({
		id: model.id,
		key: model.key,
		name: model.name,
		permissions: (model.permissions ?? []).map((permission) =>
			PermissionEntity.initialize({
				id: permission.id,
				key: permission.key,
				name: permission.name,
			}),
		),
	});
};

export { toGroupEntity };
