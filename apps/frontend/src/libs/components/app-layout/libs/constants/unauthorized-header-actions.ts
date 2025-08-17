import { type ComponentProps } from "react";

import { type Header } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

const unauthorizedHeaderActions: ComponentProps<typeof Header>["actions"] = [
	{ label: "Sign In", to: AppRoute.SIGN_IN },
	{ label: "Sign Up", to: AppRoute.SIGN_UP },
];

export { unauthorizedHeaderActions };
