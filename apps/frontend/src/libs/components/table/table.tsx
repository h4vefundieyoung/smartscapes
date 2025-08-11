import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { type JSX } from "react";

import styles from "./styles.module.css";

type Properties<T> = {
	columns: ColumnDef<T>[];
	data: T[];
	title: string;
};

function Table<T>({
	columns,
	data,
	title,
}: Readonly<Properties<T>>): JSX.Element {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<section className={styles["table-section"]}>
			{title && <h2 className={styles["title"]}>{title}</h2>}
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

export { Table };
