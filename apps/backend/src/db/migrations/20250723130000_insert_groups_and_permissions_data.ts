import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/libs/enums/enums.js";

type IdObject = { id: number };

type IdObjectList = IdObject[];

const ColumnName = {
	CREATED_AT: "created_at",
	GROUP_ID: "group_id",
	ID: "id",
	KEY: "key",
	NAME: "name",
	PERMISSION_ID: "permission_id",
	UPDATED_AT: "updated_at",
} as const;

async function down(knex: Knex): Promise<void> {
	const group = await knex<IdObject>(DatabaseTableName.GROUPS)
		.select(ColumnName.ID)
		.where(ColumnName.KEY, "admins")
		.first();

	const permission = await knex<IdObject>(DatabaseTableName.PERMISSIONS)
		.select(ColumnName.ID)
		.where(ColumnName.KEY, "create_route")
		.first();

	if (group?.id && permission?.id) {
		await knex(DatabaseTableName.GROUPS_TO_PERMISSIONS)
			.where({
				[ColumnName.GROUP_ID]: group.id,
				[ColumnName.PERMISSION_ID]: permission.id,
			})
			.delete();
	}

	await knex(DatabaseTableName.PERMISSIONS)
		.where(ColumnName.KEY, "create_route")
		.delete();

	await knex(DatabaseTableName.GROUPS)
		.whereIn(ColumnName.KEY, ["admins", "users"])
		.delete();
}

async function up(knex: Knex): Promise<void> {
	const now = new Date();

	await knex(DatabaseTableName.GROUPS).insert([
		{
			[ColumnName.CREATED_AT]: now,
			[ColumnName.KEY]: "admins",
			[ColumnName.NAME]: "Admins",
			[ColumnName.UPDATED_AT]: now,
		},
		{
			[ColumnName.CREATED_AT]: now,
			[ColumnName.KEY]: "users",
			[ColumnName.NAME]: "Users",
			[ColumnName.UPDATED_AT]: now,
		},
	]);

	await knex(DatabaseTableName.PERMISSIONS).insert({
		[ColumnName.CREATED_AT]: now,
		[ColumnName.KEY]: "create_route",
		[ColumnName.NAME]: "Create Route",
		[ColumnName.UPDATED_AT]: now,
	});

	const [group] = (await knex(DatabaseTableName.GROUPS)
		.select(ColumnName.ID)
		.where(ColumnName.KEY, "admins")) as IdObjectList;

	const [permission] = (await knex(DatabaseTableName.PERMISSIONS)
		.select(ColumnName.ID)
		.where(ColumnName.KEY, "create_route")) as IdObjectList;

	if (group && permission) {
		await knex(DatabaseTableName.GROUPS_TO_PERMISSIONS).insert({
			[ColumnName.CREATED_AT]: now,
			[ColumnName.GROUP_ID]: group.id,
			[ColumnName.PERMISSION_ID]: permission.id,
			[ColumnName.UPDATED_AT]: now,
		});
	}
}

export { down, up };
