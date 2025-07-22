import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/libs/enums/enums.js";

const TABLE_NAME = "group_to_permissions";

const ColumnName = {
	CREATED_AT: "created_at",
	GROUP_ID: "group_id",
	ID: "id",
	PERMISSION_ID: "permission_id",
	UPDATED_AT: "updated_at",
} as const;

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAME);
}

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.GROUP_ID)
			.notNullable()
			.references("id")
			.inTable(DatabaseTableName.GROUPS)
			.onDelete("CASCADE");

		table
			.integer(ColumnName.PERMISSION_ID)
			.notNullable()
			.references("id")
			.inTable(DatabaseTableName.PERMISSIONS)
			.onDelete("CASCADE");

		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());

		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

export { down, up };
