import { RoutesValidationRule } from "./route-validation-rule.enum.js";

const RoutesValidationMessage = {
	CATEGORY_INVALID_KEY:
		"Category key must contain only Latin letters without spaces.",
	CATEGORY_MAXIMUM_LENGTH: `Category more than ${String(RoutesValidationRule.CATEGORY_MAXIMUM_LENGTH)} characters.`,
	CATEGORY_MINIMUM_LENGTH: `Category less than ${String(RoutesValidationRule.CATEGORY_MINIMUM_LENGTH)} characters.`,
	DESCRIPTION_MAXIMUM_LENGTH: `Description more than ${String(RoutesValidationRule.NAME_MAXIMUM_LENGTH)} characters.`,
	INVALID_INPUT: "Points of interest IDs should be a number typed array.",
	MAX_INPUT_LENGTH: `Input data shouldn't contain more than ${RoutesValidationRule.REQUEST_MAX_POINTS_OF_INTEREST.toString()} items.`,
	MIN_INPUT_LENGTH: `Input data should contain at least ${RoutesValidationRule.REQUEST_MIN_POINTS_OF_INTEREST.toString()} items.`,
	MIN_PAGE: "Page must be greate than 0.",
	MIN_PER_PAGE: "Per page must be greater than 0.",
	NAME_MAXIMUM_LENGTH: `Name more than ${String(RoutesValidationRule.NAME_MAXIMUM_LENGTH)} characters.`,
	NAME_MINIMUM_LENGTH: `Name less than ${String(RoutesValidationRule.NAME_MINIMUM_LENGTH)} characters.`,
	PAGINATION_PARAMS_REQUIRED_TOGETHER:
		"Both page and perPage must be provided.",
	PLANNED_ROUTE_INVALID_TYPE: "Planned route is required.",
	REQUIRED_FIELDS_FOR_UPDATE: "At least one field must be provided for update.",
	ROUTES_MINIMUM_COUNT: `There should be no less than ${String(RoutesValidationRule.ROUTES_MINIMUM_COUNT)} points.`,
	USER_ID_INVALID_TYPE: "User id should be a number.",
} as const;

export { RoutesValidationMessage };
