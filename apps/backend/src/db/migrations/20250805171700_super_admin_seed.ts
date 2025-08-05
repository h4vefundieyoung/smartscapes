import { type Knex } from "knex";

const TableName = {
	GROUPS: "groups",
	USERS: "users",
} as const;

const GROUP_KEY = "admins";

const ColumnName = {
	EMAIL: "email",
	ID: "id",
	KEY: "key",
} as const;

type IdRecord = { id: number };

const SUPERADMIN_EMAIL = "superadmin@mail.com";

async function down(knex: Knex): Promise<void> {
	await knex(TableName.USERS).where(ColumnName.EMAIL, SUPERADMIN_EMAIL).del();
}

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		const group = await trx<IdRecord>(TableName.GROUPS)
			.select(ColumnName.ID)
			.where(ColumnName.KEY, GROUP_KEY)
			.first();

		if (!group || !group.id) {
			throw new Error(`Group "${GROUP_KEY}" not found`);
		}

		await trx(TableName.USERS).insert({
			email: SUPERADMIN_EMAIL,
			first_name: "Super",
			group_id: group.id,
			last_name: "Admin",
			password_hash:
				"$2b$10$Vf0bjBcbQWPr5hMg069YpOey4ONpeAngfdMhIMDPXbeTt0e1kHh4q",
			password_salt: "$2b$10$Vf0bjBcbQWPr5hMg069YpO",
		});
	});
}

export { down, up };
