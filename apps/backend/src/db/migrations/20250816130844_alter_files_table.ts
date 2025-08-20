import { type Knex } from "knex";

const TABLE_NAME = {
	FILES: "files",
};

const ColumnName = {
	ENTITY_ID: "entity_id",
	FOLDER: "folder",
} as const;

const FileFolderName = {
	AVATARS: "avatars",
	POIS: "pois",
	REVIEWS: "reviews",
	ROUTESL: "routes",
};

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME.FILES, (table) => {
		table.dropColumn(ColumnName.FOLDER);
		table.dropColumn(ColumnName.ENTITY_ID);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		await trx.table(TABLE_NAME.FILES).del();

		await trx.schema.alterTable(TABLE_NAME.FILES, (table) => {
			table.integer(ColumnName.ENTITY_ID).notNullable();
			table
				.enum(ColumnName.FOLDER, Object.values(FileFolderName))
				.notNullable();
		});
	});
}

export { down, up };
