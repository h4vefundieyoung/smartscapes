import { type Plugin } from "../../../libs/types/types.js";

interface AuthPluginApi extends Plugin {
	addWhiteListRoutes: (...routes: string[]) => void;
}

export { type AuthPluginApi };
