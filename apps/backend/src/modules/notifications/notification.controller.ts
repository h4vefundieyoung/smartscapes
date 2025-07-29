import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { NotificationApiPath } from "~/modules/notifications/libs/enums/enums.js";
import {
	type NotificationCreateRequestDto,
	type NotificationGetAllItemResponseDto,
} from "~/modules/notifications/libs/types/types.js";
import { notificationCreateValidationSchema } from "~/modules/notifications/libs/validation-schemas/validation-schemas.js";
import { type NotificationService } from "~/modules/notifications/notification.service.js";

class NotificationController extends BaseController {
	private notificationService: NotificationService;

	public constructor(logger: Logger, notificationService: NotificationService) {
		super(logger, APIPath.NOTIFICATIONS);

		this.notificationService = notificationService;

		this.addRoute({
			handler: this.create.bind(this),
			method: "POST",
			path: NotificationApiPath.ROOT,
			validation: {
				body: notificationCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: this.findAllByUserId.bind(this),
			method: "GET",
			path: NotificationApiPath.ROOT,
		});
	}

	public async create(
		options: APIHandlerOptions<{
			body: NotificationCreateRequestDto;
		}>,
	): Promise<APIHandlerResponse<NotificationGetAllItemResponseDto>> {
		const { body } = options;

		const notification = await this.notificationService.create(body);

		return {
			payload: { data: notification },
			status: HTTPCode.CREATED,
		};
	}

	public async findAllByUserId(
		options: APIHandlerOptions<{
			user: { id: number };
		}>,
	): Promise<
		APIHandlerResponse<{ items: NotificationGetAllItemResponseDto[] }>
	> {
		const userId = options.user.id;

		const { items } = await this.notificationService.findAllByUserId(userId);

		return {
			payload: { data: { items } },
			status: HTTPCode.OK,
		};
	}
}

export { NotificationController };
