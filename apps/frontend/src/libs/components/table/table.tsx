import {
	type ColumnDef,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Pagination } from "~/libs/components/components.js";
import { type usePagination } from "~/libs/hooks/hooks.js";

import {
	TableBody,
	TableHead,
	TableSkeleton,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties<T> = {
	columns: ColumnDef<T>[];
	data: T[];
	isLoading: boolean;
	paginationSettings: ReturnType<typeof usePagination>;
	totalItems: number;
	totalPages: number;
};

const Table = <T,>({
	columns,
	data,
	isLoading,
	paginationSettings,
	totalItems,
	totalPages,
}: Readonly<Properties<T>>): React.JSX.Element => {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className={styles["wrapper"]}>
			<div className={styles["content"]}>
				<table className={styles["table"]}>
					{isLoading ? (
						<TableSkeleton
							columns={columns}
							rowCount={paginationSettings.pageSize}
						/>
					) : (
						<>
							<TableHead table={table} />
							<TableBody table={table} />
						</>
					)}
				</table>
			</div>

			<div className={styles["footer"]}>
				<Pagination
					paginationSettings={paginationSettings}
					totalItems={totalItems}
					totalPages={totalPages}
				/>
			</div>
		</div>
	);
};

export { Table };
