import { type ColumnDef } from "@tanstack/react-table";

import { DataFormat } from "~/libs/enums/enums.js";
import { getFormattedDate } from "~/libs/helpers/helpers.js";
import { type PointsOfInterestGetAllItemResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { ActionCell } from "../../../components.js";

const createColumns = (
	onEdit: (id: number) => void,
	onDelete: (id: number) => void,
): ColumnDef<PointsOfInterestGetAllItemResponseDto>[] => [
	{
		accessorKey: "id",
		header: "Id",
		maxSize: 100,
		minSize: 50,
		size: 66,
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
	{
		cell: ({ row }) => (
			<ActionCell id={row.original.id} onDelete={onDelete} onEdit={onEdit} />
		),
		header: "Actions",
		id: "actions",
		size: 144,
	},
];

export { createColumns };
