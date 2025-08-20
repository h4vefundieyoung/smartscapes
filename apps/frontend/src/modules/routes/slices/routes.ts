import {
	create,
	discardFormData,
	getAll,
	getRouteById,
	preserveFormData,
	restoreFormData,
	updateFormData,
} from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	create,
	discardFormData,
	getAll,
	getRouteById,
	preserveFormData,
	restoreFormData,
	updateFormData,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
