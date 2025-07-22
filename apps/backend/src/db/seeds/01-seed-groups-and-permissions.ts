import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/libs/enums/enums.js";

type IdObject = { id: number };

type IdObjectList = IdObject[];

const seed = async (knex: Knex): Promise<void> => {
	const [adminId]: IdObjectList = await knex(DatabaseTableName.GROUPS)
		.insert([
			{ key: "admins", name: "Admins" },
			{ key: "users", name: "Users" },
		])
		.returning("id");

	const [permission]: IdObjectList = await knex(DatabaseTableName.PERMISSIONS)
		.insert([{ key: "create_route", name: "Create Route" }])
		.returning("id");

	if (!adminId?.id || !permission?.id) {
		throw new Error("Missing adminId or permissionId");
	}

	await knex(DatabaseTableName.GROUP_TO_PERMISSIONS).insert([
		{
			group_id: adminId.id,
			permission_id: permission.id,
		},
	]);
};

export { seed };
