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
import { type UserGetAllItemResponseDto } from "./libs/types/types.js";

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
			handler: this.follow.bind(this),
			method: "POST",
			path: UsersApiPath.FOLLOW,
		});

		this.addRoute({
			handler: this.unfollow.bind(this),
			method: "DELETE",
			path: UsersApiPath.UNFOLLOW,
		});
	}

	/**
	 * @swagger
	 * /users:
	 *   get:
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
		APIHandlerResponse<UserGetAllItemResponseDto[]>
	> {
		const { items } = await this.userService.findAll();

		return {
			payload: { data: items },
			status: HTTPCode.OK,
		};
	}

	public async follow(
		request: APIHandlerOptions<{
			body: { followingId: string };
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const { followingId } = request.body;
		const { id: followerId } = request.params;

		await this.userService.follow(Number(followerId), Number(followingId));

		return {
			payload: null,
			status: HTTPCode.OK,
		};
	}

	public async unfollow(
		request: APIHandlerOptions<{ params: { id: string; userId: string } }>,
	): Promise<APIHandlerResponse> {
		const { id: followingId, userId: followerId } = request.params;

		await this.userService.unfollow(Number(followerId), Number(followingId));

		return {
			payload: null,
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
