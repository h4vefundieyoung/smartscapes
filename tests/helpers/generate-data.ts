import { faker } from "@faker-js/faker";
import {
	type PointsOfInterestCreateRequestDto,
	type UserSignUpRequestDto,
} from "@smartscapes/shared";

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

const generateRandomPoi = (): PointsOfInterestCreateRequestDto => {
	return {
		description: faker.lorem.sentence(),
		location: {
			coordinates: [faker.location.longitude(), faker.location.latitude()],
			type: "Point",
		},
		name: `Place-${generateId()}`,
	};
};

export { createRandomUser, generateId, generateRandomPoi };
