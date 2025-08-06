import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import {
	type UserGetByIdItemResponseDto,
	type UserProfilePatchRequestDto,
} from "./libs/types/types.js";
import { userProfilePatchValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *           example: user@example.com
 *         lastName:
 *          type: string
 *          example: Doe
 *         firstName:
 *          type: string
 *          example: John
 */

class UserController extends BaseController {
	private userService: UserService;

	public constructor(logger: Logger, userService: UserService) {
		super(logger, APIPath.USERS);
		this.userService = userService;

		this.addRoute({
			handler: this.findAll.bind(this),
			method: "GET",
			path: UsersApiPath.ROOT,
		});

		this.addRoute({
			handler: this.patch.bind(this),
			method: "PATCH",
			path: UsersApiPath.$ID,
			validation: {
				body: userProfilePatchValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /users:
	 *   get:
	 *     security:
	 *      - bearerAuth: []
	 *     tags:
	 *       - Users
	 *     summary: Retrieve all users
	 *     responses:
	 *       200:
	 *         description: A list of users
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/User'
	 */
	public async findAll(): Promise<
		APIHandlerResponse<UserGetByIdItemResponseDto[]>
	> {
		const { items } = await this.userService.findAll();

		return {
			payload: { data: items },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *   patch:
	 *     security:
	 *      - bearerAuth: []
	 *     tags:
	 *       - Users
	 *     summary: Update user profile
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: integer
	 *         description: User ID
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               firstName:
	 *                 type: string
	 *                 example: John
	 *               lastName:
	 *                 type: string
	 *                 example: Doe
	 *     responses:
	 *       200:
	 *         description: User profile updated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/User'
	 */
	public async patch(
		options: APIHandlerOptions<{
			body: UserProfilePatchRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse<UserGetByIdItemResponseDto>> {
		const { body, params } = options;
		const id = Number(params.id);
		const user = await this.userService.patch(id, body);

		return {
			payload: { data: user },
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
