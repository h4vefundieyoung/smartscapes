import { type Knex } from "knex";

const ROUTES_TABLE = "routes";
const PLANNED_ROUTES_TABLE = "planned_routes";

const ColumnName = {
	DISTANCE: "distance",
	DURATION: "duration",
	GEOMETRY: "geometry",
	USER_ID: "userId",
} as const;

const DECIMAL_PRECISION = 10;
const DECIMAL_SCALE = 3;

async function down(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		await trx.schema.dropTableIfExists(PLANNED_ROUTES_TABLE);

		await trx.schema.alterTable(ROUTES_TABLE, (table) => {
			table.dropColumn(ColumnName.DISTANCE);
			table.dropColumn(ColumnName.DURATION);
			table.dropColumn(ColumnName.GEOMETRY);
		});
	});
}

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		await trx.schema.alterTable(ROUTES_TABLE, (table) => {
			table
				.decimal(ColumnName.DISTANCE, DECIMAL_PRECISION, DECIMAL_SCALE)
				.notNullable();
			table
				.decimal(ColumnName.DURATION, DECIMAL_PRECISION, DECIMAL_SCALE)
				.notNullable();
			table
				.specificType(ColumnName.GEOMETRY, "geometry(LineString, 4326)")
				.notNullable();
		});

		await trx.schema.createTable(PLANNED_ROUTES_TABLE, (table) => {
			table.increments("id").primary();
			table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
			table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
			table
				.integer(ColumnName.USER_ID)
				.notNullable()
				.references("id")
				.inTable("users")
				.onDelete("CASCADE");
			table
				.decimal(ColumnName.DISTANCE, DECIMAL_PRECISION, DECIMAL_SCALE)
				.notNullable();
			table
				.decimal(ColumnName.DURATION, DECIMAL_PRECISION, DECIMAL_SCALE)
				.notNullable();
			table
				.specificType(ColumnName.GEOMETRY, "geometry(LineString, 4326)")
				.notNullable();
		});
	});
}

export { down, up };
