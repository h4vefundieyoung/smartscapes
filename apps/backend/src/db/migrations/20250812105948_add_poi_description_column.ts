import { type Knex } from "knex";

const TABLE_NAME = "points_of_interest";
const DEFAULT_DESCRIPTION = "Not specified";

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn("description");
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		await trx.schema.alterTable(TABLE_NAME, (table) => {
			table.text("description");
		});
		await trx
			.table(TABLE_NAME)
			.whereNull("description")
			.update({ description: DEFAULT_DESCRIPTION });
	});
}

export { down, up };
