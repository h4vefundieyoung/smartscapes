import { type Knex } from "knex";

const TABLE_NAME = "points_of_interest";

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.text("description").nullable().alter();
	});
}

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.text("description").notNullable().alter();
	});
}

export { down, up };
