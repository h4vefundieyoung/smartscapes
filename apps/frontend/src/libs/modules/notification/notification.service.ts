import { toast } from "react-toastify";

const COMMON_MESSAGES = {
	// Can be extended with more specific messages as needed
	ERROR: {
		DEFAULT: "Something went wrong",
	},
	SUCCESS: {
		DEFAULT: "Success",
	},
	WARNING: {
		DEFAULT: "Warning",
	},
	INFO: {
		DEFAULT: "Info",
	},
} as const;

class NotificationService {
	public readonly messages = COMMON_MESSAGES;

	public showError(message?: string): void {
		toast.error(message || this.messages.ERROR.DEFAULT);
	}

	public showWarning(message?: string): void {
		toast.warn(message || this.messages.WARNING.DEFAULT);
	}

	public showSuccess(message?: string): void {
		toast.success(message || this.messages.SUCCESS.DEFAULT);
	}

	public showInfo(message?: string): void {
		toast.info(message || this.messages.INFO.DEFAULT);
	}
}

const notificationService = new NotificationService();

export const showError =
	notificationService.showError.bind(notificationService);

// Uncomment when needed (commented out to avoid unused exports (linter errors)):
// export { notificationService };
// export const showWarning = notificationService.showWarning.bind(notificationService);
// export const showSuccess = notificationService.showSuccess.bind(notificationService);
// export const showInfo = notificationService.showInfo.bind(notificationService);
