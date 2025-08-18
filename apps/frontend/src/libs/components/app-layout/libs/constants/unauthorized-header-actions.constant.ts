import { type ComponentProps } from "react";

import { type Header } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

const UNAUTHORIZED_HEADER_ACTIONS: ComponentProps<typeof Header>["actions"] = [
	{ label: "Sign In", to: AppRoute.SIGN_IN },
];

export { UNAUTHORIZED_HEADER_ACTIONS };
