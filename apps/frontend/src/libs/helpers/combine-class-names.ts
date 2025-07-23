import { type ClassValue, clsx } from "clsx";

function combineClassNames(...inputs: ClassValue[]): string {
	return clsx(...inputs);
}

export { combineClassNames };
