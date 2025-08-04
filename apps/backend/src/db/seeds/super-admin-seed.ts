/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Knex } from "knex";

const TableName = {
	GROUP_KEY: "admins",
	GROUPS: "groups",
	USERS: "users",
};
const ColumnName = {
	ID: "id",
};

async function seed(knex: Knex): Promise<void> {
	const group = await knex(TableName.GROUPS)
		.select(ColumnName.ID)
		.where({ key: TableName.GROUP_KEY })
		.first();

	if (!group) {
		throw new Error(`Group "${TableName.GROUP_KEY}" not found`);
	}

	await knex(TableName.USERS).insert({
		email: "superadmin@mail.com",
		first_name: "Super",
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		group_id: group.id,
		last_name: "Admin",
		password_hash:
			"$2b$10$Vf0bjBcbQWPr5hMg069YpOey4ONpeAngfdMhIMDPXbeTt0e1kHh4q",
		password_salt: "$2b$10$Vf0bjBcbQWPr5hMg069YpO",
	});
}

export { seed };
