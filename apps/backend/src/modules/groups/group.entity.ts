import { type Entity } from "~/libs/types/types.js";

import { type PermissionEntity } from "../permission/permission.entity.js";

class GroupEntity implements Entity {
	private id: null | number;
	private key: string;
	private name: string;
	private permissions: null | PermissionEntity[];

	private constructor({
		id,
		key,
		name,
		permissions = [],
	}: {
		id: null | number;
		key: string;
		name: string;
		permissions?: PermissionEntity[];
	}) {
		this.id = id;
		this.key = key;
		this.name = name;
		this.permissions = permissions;
	}

	public static initialize({
		id,
		key,
		name,
	}: {
		id: number;
		key: string;
		name: string;
	}): GroupEntity {
		return new GroupEntity({ id, key, name });
	}

	public static initializeNew({
		key,
		name,
	}: {
		key: string;
		name: string;
	}): GroupEntity {
		return new GroupEntity({
			id: null,
			key,
			name,
		});
	}

	public static initializeWithPermissions({
		id,
		key,
		name,
		permissions,
	}: {
		id: number;
		key: string;
		name: string;
		permissions: PermissionEntity[];
	}): GroupEntity {
		return new GroupEntity({ id, key, name, permissions });
	}

	public toNewObject(): {
		key: string;
		name: string;
	} {
		return {
			key: this.key,
			name: this.name,
		};
	}

	public toObject(): {
		id: number;
		key: string;
		name: string;
		permissions: {
			id: number;
			key: string;
			name: string;
		}[];
	} {
		return {
			id: this.id as number,
			key: this.key,
			name: this.name,
			permissions: (this.permissions ?? []).map((p) => {
				const { id, key, name } = p.toObject();

				return { id, key, name };
			}),
		};
	}
}

export { GroupEntity };
