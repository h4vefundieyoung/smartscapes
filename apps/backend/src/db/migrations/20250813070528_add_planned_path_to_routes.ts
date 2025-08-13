import { type Knex } from "knex";

const TABLE_NAME = "routes";

const ColumnName = {
	PLANNED_PATH: "planned_path",
} as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(ColumnName.PLANNED_PATH);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.jsonb(ColumnName.PLANNED_PATH).notNullable();
	});
}

export { down, up };
