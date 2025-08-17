import { type Knex } from "knex";

const ROUTES_TABLE = "routes";
const PLANNED_PATHS_TABLE = "planned_paths";

const ColumnName = {
	DISTANCE: "distance",
	DURATION: "duration",
	GEOMETRY: "geometry",
	USER_ID: "user_id",
} as const;

const DECIMAL_PRECISION = 10;
const DECIMAL_SCALE = 3;

async function down(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		await trx.schema.raw(
			`DROP TRIGGER IF EXISTS trg_delete_planned_path_on_route_insert ON ${ROUTES_TABLE};`,
		);
		await trx.schema.raw(
			"DROP FUNCTION IF EXISTS delete_planned_path_on_route_insert();",
		);

		await trx.schema.dropTableIfExists(PLANNED_PATHS_TABLE);

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
			table
				.integer(ColumnName.USER_ID)
				.notNullable()
				.references("id")
				.inTable("users")
				.onDelete("CASCADE");
		});

		await trx.schema.createTable(PLANNED_PATHS_TABLE, (table) => {
			table.increments("id").primary();
			table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
			table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

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

		await trx.schema.raw(`
			CREATE OR REPLACE FUNCTION delete_planned_path_on_route_insert()
			RETURNS trigger AS $$
			DECLARE
				v_planned_id INT := NULLIF(current_setting('app.planned_path_id', true), '')::INT;
			BEGIN
				IF v_planned_id IS NOT NULL THEN
					DELETE FROM ${PLANNED_PATHS_TABLE} WHERE id = v_planned_id;
				END IF;
				RETURN NEW;
			END;
			$$ LANGUAGE plpgsql;
		`);

		await trx.schema.raw(`
			CREATE TRIGGER trg_delete_planned_path_on_route_insert
			AFTER INSERT ON ${ROUTES_TABLE}
			FOR EACH STATEMENT
			EXECUTE FUNCTION delete_planned_path_on_route_insert();
		`);
	});
}

export { down, up };
