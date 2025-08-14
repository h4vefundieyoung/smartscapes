import { expect } from "@playwright/test";
import { Ajv } from "ajv";

const ajv = new Ajv({ strict: false });
const validatorCache = new WeakMap<object, (data: unknown) => boolean>();

const expectToMatchSchema = (responseBody: unknown, schema: object): void => {
	let validate = validatorCache.get(schema);

	if (!validate) {
		validate = ajv.compile(schema);
		validatorCache.set(schema, validate);
	}

	const valid = validate(responseBody);
	expect.soft(valid, "Response should match schema").toBe(true);
};

export { expectToMatchSchema };
