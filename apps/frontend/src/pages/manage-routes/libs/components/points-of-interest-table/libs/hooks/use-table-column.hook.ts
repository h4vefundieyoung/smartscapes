import { type ColumnDef } from "@tanstack/react-table";

import { useCallback, useMemo } from "~/libs/hooks/hooks.js";
import { type RowData } from "~/pages/manage-routes/libs/types/row-data.types.js";

import { createColumns } from "../helpers/helpers.js";

const useTableColumns = (): ColumnDef<RowData>[] => {
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
