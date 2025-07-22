import { type Knex } from "knex";

const TABLE_NAME = "users";

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn("group_id");
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table
			.integer("group_id")
			.unsigned()
			.references("id")
			.inTable("groups")
			.nullable();
	});
}

export { down, up };
