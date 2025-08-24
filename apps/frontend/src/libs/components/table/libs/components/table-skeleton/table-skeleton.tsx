import { type ColumnDef } from "@tanstack/react-table";

import { combineClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties<T> = {
	columns: ColumnDef<T>[];
	rowCount: number;
};

const TableSkeleton = <T,>({
	columns,
	rowCount,
}: Properties<T>): React.JSX.Element => {
	return (
		<>
			<thead>
				<tr>
					{columns.map((_, index) => (
						<th
							className={combineClassNames(
								styles["header-cell"],
								styles["skeleton-header"],
							)}
							key={index}
						>
							<div className={styles["skeleton-line"]} />
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: rowCount }).map((_, rowIndex) => (
					<tr className={styles["row"]} key={rowIndex}>
						{columns.map((_, cellIndex) => (
							<td
								className={combineClassNames(
									styles["cell"],
									styles["skeleton-cell"],
								)}
								key={cellIndex}
							>
								<div className={styles["skeleton-line"]} />
							</td>
						))}
					</tr>
				))}
			</tbody>
		</>
	);
};

export { TableSkeleton };
