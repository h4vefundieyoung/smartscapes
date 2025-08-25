import { type Knex } from "knex";

type IdRecord = { id: number };

const TableName = {
	GROUPS: "groups",
	GROUPS_TO_PERMISSIONS: "groups_to_permissions",
	PERMISSIONS: "permissions",
} as const;

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
	await knex.transaction(async (trx) => {
		const group = await trx<IdRecord>(TableName.GROUPS)
			.select(ColumnName.ID)
			.where(ColumnName.KEY, "admins")
			.first();

		const permission = await trx<IdRecord>(TableName.PERMISSIONS)
			.select(ColumnName.ID)
			.where(ColumnName.KEY, "manage_categories")
			.first();

		if (group?.id && permission?.id) {
			await trx(TableName.GROUPS_TO_PERMISSIONS)
				.where({
					[ColumnName.GROUP_ID]: group.id,
					[ColumnName.PERMISSION_ID]: permission.id,
				})
				.delete();
		}

		await trx(TableName.PERMISSIONS)
			.where(ColumnName.KEY, "manage_categories")
			.delete();
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		const group = await trx<IdRecord>(TableName.GROUPS)
			.select(ColumnName.ID)
			.where(ColumnName.KEY, "admins")
			.first();

		const [permission] = (await trx(TableName.PERMISSIONS)
			.insert({
				[ColumnName.CREATED_AT]: trx.fn.now(),
				[ColumnName.KEY]: "manage_categories",
				[ColumnName.NAME]: "Manage Categories",
				[ColumnName.UPDATED_AT]: trx.fn.now(),
			})
			.returning(["id"])) as IdRecord[];

		await trx(TableName.GROUPS_TO_PERMISSIONS).insert({
			[ColumnName.CREATED_AT]: trx.fn.now(),
			[ColumnName.GROUP_ID]: group?.id,
			[ColumnName.PERMISSION_ID]: permission?.id,
			[ColumnName.UPDATED_AT]: trx.fn.now(),
		});
	});
}

export { down, up };
