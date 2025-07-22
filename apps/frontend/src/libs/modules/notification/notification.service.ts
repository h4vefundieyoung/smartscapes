import { toast } from "react-toastify";

const COMMON_MESSAGES = {
	// Can be extended with more specific messages as needed
	ERROR: {
		DEFAULT: "Something went wrong",
	},
	INFO: {
		DEFAULT: "Info",
	},
	SUCCESS: {
		DEFAULT: "Success",
	},
	WARNING: {
		DEFAULT: "Warning",
	},
} as const;

class NotificationService {
	public readonly messages = COMMON_MESSAGES;

	public showError(message?: string): void {
		toast.error(message || this.messages.ERROR.DEFAULT);
	}

	public showInfo(message?: string): void {
		toast.info(message || this.messages.INFO.DEFAULT);
	}

	public showSuccess(message?: string): void {
		toast.success(message || this.messages.SUCCESS.DEFAULT);
	}

	public showWarning(message?: string): void {
		toast.warn(message || this.messages.WARNING.DEFAULT);
	}
}

const notificationService = new NotificationService();

export { notificationService };
