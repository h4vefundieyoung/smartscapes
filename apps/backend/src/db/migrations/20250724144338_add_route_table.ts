import { type Knex } from "knex";

const ROUTES_TABLE = "routes";
const ROUTES_TO_POIS_TABLE = "routes_to_pois";
const POI_TABLE = "points_of_interest";
const DESCRIPTION_MAXIMUM_LENGTH = 2000;

async function down(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		await trx.schema.dropTableIfExists(ROUTES_TO_POIS_TABLE);
		await trx.schema.dropTableIfExists(ROUTES_TABLE);
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		await trx.schema.createTable(ROUTES_TABLE, (table) => {
			table.increments("id").primary();
			table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
			table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
			table.string("name").notNullable();
			table.string("description", DESCRIPTION_MAXIMUM_LENGTH).notNullable();
		});

		await trx.schema.createTable(ROUTES_TO_POIS_TABLE, (table) => {
			table.increments("id").primary();
			table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
			table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
			table
				.integer("route_id")
				.notNullable()
				.references("id")
				.inTable(ROUTES_TABLE)
				.onDelete("CASCADE");
			table.integer("poi_id").notNullable().references("id").inTable(POI_TABLE);
			table.integer("visit_order").notNullable();
		});
	});
}

export { down, up };
