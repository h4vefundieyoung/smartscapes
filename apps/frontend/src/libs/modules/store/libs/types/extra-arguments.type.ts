import { type toastNotifier } from "~/libs/modules/notification/notification.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	authApi: typeof authApi;
	toastNotifier: typeof toastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
