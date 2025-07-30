import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { authController } from "~/modules/auth/auth.js";
import { pointsOfInterestController } from "~/modules/points-of-interest/points-of-interest.js";
import { routeCategoryController } from "~/modules/route-categories/route-categories.js";
import { userController } from "~/modules/users/users.js";

import { BaseServerApplicationApi } from "./base-server-application-api.js";
import { BaseServerApplication } from "./base-server-application.js";
import { WHITE_ROUTES } from "./libs/constants/constants.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...authController.routes,
	...routeCategoryController.routes,
	...userController.routes,
	...pointsOfInterestController.routes,
);

apiV1.injectWhiteRoutes(WHITE_ROUTES);

const serverApplication = new BaseServerApplication({
	apis: [apiV1],
	config,
	database,
	logger,
	title: "SmartScapes",
});

export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
export { serverApplication };
