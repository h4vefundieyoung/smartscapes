import { type Storage } from "~/libs/modules/storage/storage.js";
import { type toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type pointsOfInterestApi } from "~/modules/points-of-interest/points-of-interest.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	authApi: typeof authApi;
	pointsOfInterestApi: typeof pointsOfInterestApi;
	storage: Storage;
	toastNotifier: typeof toastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
