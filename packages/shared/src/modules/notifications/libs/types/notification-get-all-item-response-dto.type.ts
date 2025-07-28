import { type ValueOf } from "src/libs/types/value-of.type.js";

import { type EntityType, type NotificationType } from "../enums/enums.js";

type NotificationGetAllItemResponseDto = {
	content: string;
	createdAt: string;
	entityId: number;
	entityType: ValueOf<typeof EntityType>;
	id: number;
	notificationType: ValueOf<typeof NotificationType>;
	readAt: null | string;
	updatedAt: string;
	userId: number;
};

export { type NotificationGetAllItemResponseDto };
