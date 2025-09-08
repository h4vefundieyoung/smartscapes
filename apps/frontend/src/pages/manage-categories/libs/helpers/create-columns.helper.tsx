import { type ColumnDef } from "@tanstack/react-table";

import { DataFormat } from "~/libs/enums/enums.js";
import { getFormattedDate } from "~/libs/helpers/helpers.js";
import { type CategoryGetAllItemResponseDto } from "~/modules/categories/categories.js";

const createColumns = (): ColumnDef<CategoryGetAllItemResponseDto>[] => [
	{
		accessorKey: "id",
		header: "Id",
		maxSize: 100,
		minSize: 50,
		size: 80,
	},
	{
		accessorKey: "name",
		header: "Name",
		minSize: 150,
		size: 491,
	},
	{
		accessorKey: "createdAt",
		cell: ({ row }): string => {
			return getFormattedDate(
				new Date(row.original.createdAt),
				DataFormat.DATE_DD_MMM_YYYY,
			);
		},
		header: "Created at",
		size: 355,
	},
];

export { createColumns };
