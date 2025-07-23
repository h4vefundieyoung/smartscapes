import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/token/token.js";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { type AuthService } from "./auth.service.js";
import { AuthApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * components:
 *    schemas:
 *      UserSignUpRequestDto:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            example: user@example.com
 *          password:
 *            type: string
 *            example: strongP@ssw0rd
 *
 *      UserAuthResponseDto:
 *        type: object
 *        $ref: '#/components/schemas/User'
 */

class AuthController extends BaseController {
	private authService: AuthService;

	public constructor(logger: Logger, authService: AuthService) {
		super(logger, APIPath.AUTH);

		this.authService = authService;

		this.addRoute({
			handler: this.signUp.bind(this),
			method: "POST",
			path: AuthApiPath.SIGN_UP,
			validation: {
				body: userSignUpValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /auth/sign-up:
	 *    post:
	 *      tags:
	 *       - Auth
	 *      summary: Register a new user
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: '#/components/schemas/UserSignUpRequestDto'
	 *      responses:
	 *        201:
	 *          description: User registered
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  data:
	 *                    $ref: '#/components/schemas/UserAuthResponseDto'
	 */
	public async signUp(
		options: APIHandlerOptions<{
			body: UserSignUpRequestDto;
		}>,
	): Promise<APIHandlerResponse<UserAuthResponseDto<UserSignUpResponseDto>>> {
		const { body } = options;

		const user = await this.authService.signUp(body);
		const token = await this.authService.generateToken(user.id);

		return {
			payload: { data: { token, user } },
			status: HTTPCode.CREATED,
		};
	}
}

export { AuthController };
