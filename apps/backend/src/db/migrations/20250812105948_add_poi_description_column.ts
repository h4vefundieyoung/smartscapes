import { type Knex } from "knex";

const TABLE_NAME = "points_of_interest";
const DESCRIPTION_LIMIT = 8000;

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn("description");
	});
}

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string("description", DESCRIPTION_LIMIT);
	});
}

export { down, up };
