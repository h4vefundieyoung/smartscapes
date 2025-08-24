import { flexRender, type Table } from "@tanstack/react-table";

import styles from "./styles.module.css";

type Properties<T> = {
	table: Table<T>;
};

const TableBody = <T,>({ table }: Properties<T>): React.JSX.Element => {
	return (
		<tbody className={styles["body"]}>
			{table.getRowModel().rows.map((row) => (
				<tr className={styles["row"]} key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<td className={styles["cell"]} key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

export { TableBody };
