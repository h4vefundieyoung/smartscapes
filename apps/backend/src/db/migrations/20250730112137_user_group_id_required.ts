import { type Knex } from "knex";

const TABLE_NAME = {
	GROUP: "groups",
	USER: "users",
} as const;

const ColumnName = {
	GROUP_ID: "group_id",
	ID: "id",
	KEY: "key",
} as const;

const SINGLE = 1;

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME.USER, (table) => {
		table.integer(ColumnName.GROUP_ID).nullable().alter();
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		await trx(TABLE_NAME.USER)
			.whereNull(ColumnName.GROUP_ID)
			.update({
				[ColumnName.GROUP_ID]: knex(TABLE_NAME.GROUP)
					.select(ColumnName.ID)
					.where(ColumnName.KEY, "users")
					.limit(SINGLE),
			});

		await trx.schema.alterTable(TABLE_NAME.USER, (table) => {
			table.integer(ColumnName.GROUP_ID).notNullable().alter();
		});
	});
}

export { down, up };
