import { type Knex } from "knex";

type TransactionOptions = {
	transaction?: Knex.Transaction;
};

export { type TransactionOptions };
