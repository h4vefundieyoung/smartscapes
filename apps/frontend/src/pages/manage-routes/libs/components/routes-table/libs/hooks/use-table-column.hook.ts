import { type RouteGetAllItemResponseDto } from "@smartscapes/shared";
import { type ColumnDef } from "@tanstack/react-table";

import { useCallback, useMemo } from "~/libs/hooks/hooks.js";

import { createColumns } from "../helpers/helpers.js";

const useTableColumns = (): ColumnDef<RouteGetAllItemResponseDto>[] => {
	const handleEdit = useCallback((id: number) => {
		return id;
	}, []);

	const handleDelete = useCallback((id: number) => {
		return id;
	}, []);

	const columns = useMemo(() => {
		return createColumns(handleEdit, handleDelete);
	}, [handleEdit, handleDelete]);

	return columns;
};

export { useTableColumns };
