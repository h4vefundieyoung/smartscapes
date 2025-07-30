import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { authController } from "~/modules/auth/auth.js";
import { notificationController } from "~/modules/notifications/notifications.js";
import { pointsOfInterestController } from "~/modules/points-of-interest/points-of-interest.js";
import { userController } from "~/modules/users/users.js";

import { BaseServerApplicationApi } from "./base-server-application-api.js";
import { BaseServerApplication } from "./base-server-application.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...authController.routes,
	...userController.routes,
	...notificationController.routes,
	...pointsOfInterestController.routes,
);

const serverApplication = new BaseServerApplication({
	apis: [apiV1],
	config,
	database,
	logger,
	title: "SmartScapes",
});

export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
export { serverApplication };
