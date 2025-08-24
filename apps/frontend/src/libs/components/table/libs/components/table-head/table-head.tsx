import { flexRender, type Table } from "@tanstack/react-table";

import styles from "./styles.module.css";

type Properties<T> = {
	table: Table<T>;
};

const TableHead = <T,>({ table }: Properties<T>): React.JSX.Element => {
	return (
		<thead className={styles["head"]}>
			{table.getHeaderGroups().map((headerGroup) => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<th
							className={styles["cell"]}
							key={header.id}
							style={{ width: header.getSize() }}
						>
							{flexRender(header.column.columnDef.header, header.getContext())}
						</th>
					))}
				</tr>
			))}
		</thead>
	);
};

export { TableHead };
