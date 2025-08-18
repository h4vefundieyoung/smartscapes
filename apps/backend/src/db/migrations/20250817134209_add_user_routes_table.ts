import { type Knex } from "knex";

const TABLE = "user_routes";
const ROUTES_TABLE = "routes";
const USERS_TABLE = "users";

const ColumnName = {
	ACTUAL_GEOMETRY: "actual_geometry",
	COMPLETED_AT: "completed_at",
	CREATED_AT: "created_at",
	ID: "id",
	PLANNED_GEOMETRY: "planned_geometry",
	ROUTE_ID: "route_id",
	STARTED_AT: "started_at",
	STATUS: "status",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const USER_ROUTE_STATUS = [
	"active",
	"cancelled",
	"completed",
	"expired",
	"not_started",
] as const;

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE);
	await knex.schema.raw("DROP TYPE IF EXISTS user_route_status CASCADE");
	await knex.schema.raw(
		`DROP TRIGGER IF EXISTS user_routes_set_timestamps_trg ON ${TABLE}`,
	);
	await knex.schema.raw("DROP FUNCTION IF EXISTS user_routes_set_timestamps()");
}

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.timestamp(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.timestamp(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.integer(ColumnName.USER_ID)
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.ROUTE_ID)
			.notNullable()
			.references("id")
			.inTable(ROUTES_TABLE)
			.onDelete("CASCADE");
		table
			.enum(ColumnName.STATUS, USER_ROUTE_STATUS, {
				enumName: "user_route_status",
				useNative: true,
			})
			.notNullable();
		table.timestamp(ColumnName.STARTED_AT).nullable().defaultTo(null);
		table.timestamp(ColumnName.COMPLETED_AT).nullable().defaultTo(null);
		table
			.specificType(ColumnName.PLANNED_GEOMETRY, "geometry(LineString, 4326)")
			.notNullable();
		table
			.specificType(ColumnName.ACTUAL_GEOMETRY, "geometry(LineString, 4326)")
			.notNullable();
	});

	await knex.schema.raw(`
		CREATE OR REPLACE FUNCTION user_routes_set_timestamps()
		RETURNS trigger AS $$
		BEGIN
		IF NEW.status = 'active' AND (OLD.status IS DISTINCT FROM 'active') THEN
			NEW.started_at := NOW();
		END IF;

		IF NEW.status = 'completed' AND (OLD.status IS DISTINCT FROM 'completed') THEN
			NEW.completed_at := NOW();
		END IF;

		RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
		`);

	await knex.schema.raw(`
		CREATE TRIGGER user_routes_set_timestamps_trg
		BEFORE UPDATE OF status ON ${TABLE}
		FOR EACH ROW EXECUTE FUNCTION user_routes_set_timestamps();
		`);
}

export { down, up };
