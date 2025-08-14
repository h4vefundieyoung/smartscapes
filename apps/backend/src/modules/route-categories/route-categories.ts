import { logger } from "~/libs/modules/logger/logger.js";

import { CategoryModel } from "../categories/category.model.js";
import { RouteCategoryController } from "./route-category.controller.js";
import { RouteCategoryRepository } from "./route-category.repository.js";
import { RouteCategoryService } from "./route-category.service.js";

const routeCategoryRepository = new RouteCategoryRepository(CategoryModel);
const routeCategoryService = new RouteCategoryService(routeCategoryRepository);
const routeCategoryController = new RouteCategoryController(
	logger,
	routeCategoryService,
);

export { routeCategoryController };
export { type RouteCategoryGetAllItemResponseDto } from "./libs/types/types.js";
