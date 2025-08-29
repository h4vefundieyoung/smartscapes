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
						<td key={cell.id}>
							<div className={styles["cell"]}>
								<div className={styles["cell-content-wrapper"]}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</div>
							</div>
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

export { TableBody };
