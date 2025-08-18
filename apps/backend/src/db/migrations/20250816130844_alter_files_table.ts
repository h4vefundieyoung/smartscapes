import { type Knex } from "knex";

const TABLE_NAME = {
	FILES: "files",
};

const ColumnName = {
	ENTITY_ID: "entity_id",
	FOLDER: "folder",
} as const;

const FOLDER_VALUES = ["avatars", "pois", "reviews", "routes"];

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME.FILES, (table) => {
		table.dropColumn(ColumnName.FOLDER);
		table.dropColumn(ColumnName.ENTITY_ID);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME.FILES, (table) => {
		table.integer(ColumnName.ENTITY_ID).notNullable();
		table.enu(ColumnName.FOLDER, FOLDER_VALUES).notNullable();
	});
}

export { down, up };
