import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/libs/enums/enums.js";

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
	await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
		table.dropColumn(ColumnName.GROUP_ID);
	});

	await knex.schema.dropTableIfExists(DatabaseTableName.GROUPS_TO_PERMISSIONS);
	await knex.schema.dropTableIfExists(DatabaseTableName.PERMISSIONS);
	await knex.schema.dropTableIfExists(DatabaseTableName.GROUPS);
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(DatabaseTableName.GROUPS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.timestamp(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.timestamp(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table.string(ColumnName.KEY).notNullable().unique();
		table.string(ColumnName.NAME).notNullable();
	});

	await knex.schema.createTable(DatabaseTableName.PERMISSIONS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.timestamp(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.timestamp(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table.string(ColumnName.KEY).notNullable().unique();
		table.string(ColumnName.NAME).notNullable();
	});

	await knex.schema.createTable(
		DatabaseTableName.GROUPS_TO_PERMISSIONS,
		(table) => {
			table.increments(ColumnName.ID).primary();
			table
				.timestamp(ColumnName.CREATED_AT)
				.notNullable()
				.defaultTo(knex.fn.now());
			table
				.timestamp(ColumnName.UPDATED_AT)
				.notNullable()
				.defaultTo(knex.fn.now());
			table
				.integer(ColumnName.GROUP_ID)
				.notNullable()
				.references(ColumnName.ID)
				.inTable(DatabaseTableName.GROUPS)
				.onDelete("CASCADE");
			table
				.integer(ColumnName.PERMISSION_ID)
				.notNullable()
				.references(ColumnName.ID)
				.inTable(DatabaseTableName.PERMISSIONS)
				.onDelete("CASCADE");
		},
	);

	await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
		table
			.integer(ColumnName.GROUP_ID)
			.nullable()
			.references(ColumnName.ID)
			.inTable(DatabaseTableName.GROUPS)
			.onDelete("SET NULL");
	});
}

export { down, up };
