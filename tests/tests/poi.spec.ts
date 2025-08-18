import { expect, request, test } from "@playwright/test";
import {
	APIResponse,
	HTTPCode,
	PointsOfInterestRequestDto,
	PointsOfInterestResponseDto,
	UserSignInResponseDto,
	UserSignUpResponseDto,
} from "@smartscapes/shared";
import { ApiController } from "api/controllers/api-controller.js";
import { loginSchema } from "api/schemas/login-schema.js";
import { poiSchema } from "api/schemas/poi-schema.js";
import { signupSchema } from "api/schemas/signup-schema.js";
import { createRandomUser, generateRandomPoi } from "helpers/generate-data.js";
import { expectToMatchSchema } from "helpers/schema-validator.js";

let api: ApiController;
let accessToken: string;
let poiId: number;

test.beforeAll("Register and login user", async () => {
	const requestContext = await request.newContext();
	api = new ApiController(requestContext);

	const user = createRandomUser();
	const registerResponse = await api.auth.register(user);
	const registerBodyResponse =
		(await registerResponse.json()) as APIResponse<UserSignUpResponseDto>;

	expect.soft(registerResponse.status()).toBe(HTTPCode.CREATED);
	expectToMatchSchema(registerBodyResponse, signupSchema);
	accessToken = registerBodyResponse.data.token;

	const loginResponse = await api.auth.login(user.email, user.password);
	const loginBodyResponse =
		(await loginResponse.json()) as APIResponse<UserSignInResponseDto>;

	expect.soft(loginResponse.status()).toBe(HTTPCode.OK);
	expectToMatchSchema(loginBodyResponse, loginSchema);
	accessToken = loginBodyResponse.data.token;
});

test("Poi chain", async () => {
	await test.step("Create Poi", async () => {
		const poi = generateRandomPoi();

		const response = await api.poi.createPoi(poi, accessToken);
		const body = await response.json();

		expect(response.status()).toBe(HTTPCode.CREATED);
		expect(body.data.name).toBe(poi.name);
		expect(body.data.description).toBe(poi.description);
		expect(body.data.location.coordinates).toEqual(poi.location.coordinates);
		expectToMatchSchema(body, poiSchema);
		poiId = body.data.id;
	});

	await test.step("Get Poi by Id", async () => {
		const response = await api.poi.getPoiById(poiId, accessToken);
		const body = await response.json();

		expect.soft(response.status()).toBe(HTTPCode.OK);
		expect.soft(body.data.id).toBe(poiId);
		expectToMatchSchema(body, poiSchema);
	});

	await test.step("Updated Poi", async () => {
		const updatedPoi = generateRandomPoi();

		const response = await api.poi.updatePoi(poiId, updatedPoi, accessToken);
		const body = await response.json();

		expect.soft(response.status()).toBe(HTTPCode.OK);
		expect.soft(body.data.name).toBe(updatedPoi.name);
		expect.soft(body.data.description).toBe(updatedPoi.description);
		expectToMatchSchema(body, poiSchema);
	});

	await test.step("Delete Poi", async () => {
		const response = await api.poi.deletePoi(poiId, accessToken);
		expect.soft(response.status()).toBe(HTTPCode.OK);
	});

	await test.step("Get all Pois and check that deleted pois is not present", async () => {
		const response = await api.poi.getAllPois(accessToken);
		const body = await response.json();

		expect.soft(response.status()).toBe(HTTPCode.OK);
		expect.soft(Array.isArray(body.data)).toBe(true);

		const deletedPoi = body.data.find(
			(poi: PointsOfInterestResponseDto) => poi.id === poiId,
		);
		expect.soft(deletedPoi).toBeUndefined();
	});
});
