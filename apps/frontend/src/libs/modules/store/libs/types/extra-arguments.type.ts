import { type Storage } from "~/libs/modules/storage/storage.js";
import { type toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type fileApi } from "~/modules/files/files.js";
import { type pointOfInterestApi } from "~/modules/points-of-interest/points-of-interest.js";
import { type routesApi } from "~/modules/routes/routes.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	authApi: typeof authApi;
	fileApi: typeof fileApi;
	pointOfInterestApi: typeof pointOfInterestApi;
	routesApi: typeof routesApi;
	storage: Storage;
	toastNotifier: typeof toastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
