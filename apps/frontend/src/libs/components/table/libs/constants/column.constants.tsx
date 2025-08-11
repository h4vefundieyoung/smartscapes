import { type ColumnDef } from "@tanstack/react-table";

import { ActionCell } from "~/libs/components/table/libs/components/components.js";

import { type RowData } from "../types/types.js";

const createColumns = (
	onEdit: (id: number) => void,
	onDelete: (id: number) => void,
): ColumnDef<RowData>[] => [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "createdAt",
		header: "Created at",
	},
	{
		cell: ({ row }) => (
			<ActionCell id={row.original.id} onDelete={onDelete} onEdit={onEdit} />
		),
		header: "Actions",
		id: "actions",
	},
];

export { createColumns };
