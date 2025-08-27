import { APIPath, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationMeta } from "~/libs/types/types.js";
import { type CategoryService } from "~/modules/categories/category.service.js";

import { CategoriesApiPath } from "./libs/enums/enums.js";
import {
	type CategoryCreateRequestDto,
	type CategoryGetAllItemResponseDto,
	type CategoryGetAllQuery as CategoryGetAllQueryParameters,
} from "./libs/types/types.js";
import { categoryCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *    schemas:
 *     CategoryCreateRequestDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Popular
 *
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           example: Popular
 */

class CategoryController extends BaseController {
	private categoryService: CategoryService;

	public constructor(logger: Logger, categoryService: CategoryService) {
		super(logger, APIPath.CATEGORIES);
		this.categoryService = categoryService;

		this.addRoute({
			handler: this.create.bind(this),
			method: "POST",
			path: CategoriesApiPath.ROOT,
			preHandlers: [checkHasPermission(PermissionKey.MANAGE_CATEGORIES)],
			validation: {
				body: categoryCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: this.findAll.bind(this),
			method: "GET",
			path: CategoriesApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /categories:
	 *   post:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Categories
	 *     summary: Create new category
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/CategoryCreateRequestDto'
	 *     responses:
	 *       201:
	 *         description: New category object
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: object
	 *                   $ref: '#/components/schemas/Category'
	 *
	 *   get:
	 *     tags:
	 *       - Categories
	 *     summary: Retrieve all categories
	 *     responses:
	 *       200:
	 *         description: A list of categories
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/Category'
	 */

	public async create(
		options: APIHandlerOptions<{
			body: CategoryCreateRequestDto;
		}>,
	): Promise<APIHandlerResponse<CategoryGetAllItemResponseDto>> {
		const { body } = options;

		const item = await this.categoryService.create(body);

		return {
			payload: { data: item },
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /categories:
	 *   get:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Categories
	 *     summary: Retrieve all categories
	 *     description: |
	 *       **With pagination parameters (page & perPage)**: Returns paginated result
	 *     parameters:
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *           pattern: '^[1-9][0-9]*$'
	 *           example: "1"
	 *         description: Page number (starts from 1). When provided with perPage, returns paginated response.
	 *       - in: query
	 *         name: perPage
	 *         schema:
	 *           type: string
	 *           pattern: '^[1-9][0-9]*$'
	 *           example: "10"
	 *         description: Number of items per page. When provided with page, returns paginated response.
	 *     responses:
	 *       200:
	 *         description: A list of categories
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/Category'
	 *                 meta:
	 *                   type: object
	 *                   properties:
	 *                     currentPage:
	 *                       type: number
	 *                       example: 1
	 *                     itemsPerPage:
	 *                       type: number
	 *                       example: 10
	 *                     total:
	 *                       type: number
	 *                       example: 25
	 *                     totalPages:
	 *                       type: number
	 *                       example: 3
	 *               description: Paginated response (when page & perPage provided)
	 */

	public async findAll(
		options: APIHandlerOptions<{
			query?: CategoryGetAllQueryParameters;
		}>,
	): Promise<
		APIHandlerResponse<CategoryGetAllItemResponseDto[], PaginationMeta>
	> {
		const { query = null } = options;

		const { items, meta } = await this.categoryService.findAll(query);

		return {
			payload: { data: items, meta },
			status: HTTPCode.OK,
		};
	}
}

export { CategoryController };
