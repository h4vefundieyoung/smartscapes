import { authPatch, getAuthenticatedUser, signIn, signUp } from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	authPatch,
	getAuthenticatedUser,
	signIn,
	signUp,
};

export { allActions as actions };
export { reducer } from "./auth.slice.js";
