import { type Knex } from "knex";

const TableName = {
	PERMISSIONS: "permissions",
} as const;

const ColumnName = {
	KEY: "key",
	NAME: "name",
	UPDATED_AT: "updated_at",
} as const;

const OLD_PERMISSION_KEY = "create_route";
const NEW_PERMISSION_KEY = "manage_routes";
const OLD_PERMISSION_NAME = "Create Route";
const NEW_PERMISSION_NAME = "Manage Routes";

async function down(knex: Knex): Promise<void> {
	await knex(TableName.PERMISSIONS)
		.where(ColumnName.KEY, NEW_PERMISSION_KEY)
		.update({
			[ColumnName.KEY]: OLD_PERMISSION_KEY,
			[ColumnName.NAME]: OLD_PERMISSION_NAME,
			[ColumnName.UPDATED_AT]: knex.fn.now(),
		});
}

async function up(knex: Knex): Promise<void> {
	await knex(TableName.PERMISSIONS)
		.where(ColumnName.KEY, OLD_PERMISSION_KEY)
		.update({
			[ColumnName.KEY]: NEW_PERMISSION_KEY,
			[ColumnName.NAME]: NEW_PERMISSION_NAME,
			[ColumnName.UPDATED_AT]: knex.fn.now(),
		});
}

export { down, up };
