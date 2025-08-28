import {
	followUser,
	getActivities,
	getUserPublicProfile,
	unfollowUser,
} from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	followUser,
	getActivities,
	getUserPublicProfile,
	unfollowUser,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
