import { type Storage } from "~/libs/modules/storage/storage.js";
import { type toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type routeApi } from "~/modules/routes/routes.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	authApi: typeof authApi;
	routeApi: typeof routeApi;
	storage: Storage;
	toastNotifier: typeof toastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
