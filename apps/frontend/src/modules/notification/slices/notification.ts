import { getNotifications } from "./actions.js";
import { actions } from "./notification.slice.js";

const allActions = {
	...actions,
	getNotifications,
};

export { allActions as actions };
export { reducer } from "./notification.slice.js";
