import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { type JSX } from "react";

import { Pagination } from "~/libs/components/components.js";

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
			<table className={styles["table"]}>
				<thead className={styles["thead"]}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr className={styles["tr"]} key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th className={styles["th"]} key={header.id}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className={styles["tbody"]}>
					{table.getRowModel().rows.map((row) => (
						<tr className={styles["tr"]} key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td className={styles["td"]} key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<Pagination page={1} totalItems={34} totalPages={4} />
		</section>
	);
}

export { Table };
