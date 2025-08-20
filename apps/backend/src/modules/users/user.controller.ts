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
	type UserPublicProfileResponseDto,
} from "./libs/types/types.js";

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
 *         isVisibleProfile:
 *          type: boolean
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
			handler: this.findUserProfile.bind(this),
			method: "GET",
			path: "/:id/:currentUserId",
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
	 * /users/{id}/{currentUserId}:
	 *   get:
	 *     security:
	 *      - bearerAuth: []
	 *     tags:
	 *       - Users
	 *     summary: Get User profile public info by user id
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *       - in: path
	 *         name: currentUserId
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: User public profile
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                     $ref: '#/components/schemas/User'
	 */

	public async findUserProfile(
		options: APIHandlerOptions<{
			params: { currentUserId: string; id: string };
		}>,
	): Promise<APIHandlerResponse<UserPublicProfileResponseDto>> {
		const id = Number(options.params.id);
		const currentUserId = Number(options.params.currentUserId);
		const user = await this.userService.findUserProfile({ currentUserId, id });

		return {
			payload: { data: user },
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
