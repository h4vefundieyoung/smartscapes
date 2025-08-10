import { faker } from "@faker-js/faker";
import { type UserSignUpRequestDto } from "@smartscapes/shared";

const generateId = (): string => crypto.randomUUID();

const createRandomUser = (): UserSignUpRequestDto => {
	const password = faker.internet.password({ length: 6 });

	return {
		confirmPassword: password,
		email: `user${generateId()}@example.com`,
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		password,
	};
};

export { createRandomUser, generateId };
