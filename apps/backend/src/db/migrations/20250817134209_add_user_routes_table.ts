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
			.notNullable()
			.defaultTo("not_started");
		table
			.timestamp(ColumnName.STARTED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table.timestamp(ColumnName.COMPLETED_AT).nullable();
		table
			.specificType(ColumnName.PLANNED_GEOMETRY, "geometry(LineString, 4326)")
			.notNullable();
		table
			.specificType(ColumnName.ACTUAL_GEOMETRY, "geometry(LineString, 4326)")
			.nullable();
	});
}

export { down, up };
