import { type Knex } from "knex";

const DESCRIPTION_LENGTH = 2000;
const DEFAULT_DESCRIPTION_LENGTH = 255;

async function down(knex: Knex): Promise<void> {
	await knex("routes")
		.whereRaw("length(description) > ?", [DEFAULT_DESCRIPTION_LENGTH])
		.update({
			description: knex.raw("substring(description from 1 for ?)", [
				DEFAULT_DESCRIPTION_LENGTH,
			]),
		});

	await knex.schema.alterTable("routes", (table) => {
		table.string("description", DEFAULT_DESCRIPTION_LENGTH).alter();
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable("routes", (table) => {
		table.string("description", DESCRIPTION_LENGTH).alter();
	});
}

export { down, up };
