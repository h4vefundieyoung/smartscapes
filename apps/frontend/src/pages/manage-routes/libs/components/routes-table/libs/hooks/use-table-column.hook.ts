import { type ColumnDef } from "@tanstack/react-table";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback, useMemo } from "~/libs/hooks/hooks.js";
import { type RouteGetAllItemResponseDto } from "~/modules/routes/routes.js";

import { createColumns } from "../helpers/helpers.js";

const useTableColumns = (): ColumnDef<RouteGetAllItemResponseDto>[] => {
	const handleEdit = useCallback((id: number) => {
		const url = configureString(AppRoute.ROUTES_$ID, {
			id: String(id),
		});
		window.open(url, "_blank");
	}, []);

	const columns = useMemo(() => {
		return createColumns(handleEdit);
	}, [handleEdit]);

	return columns;
};

export { useTableColumns };
