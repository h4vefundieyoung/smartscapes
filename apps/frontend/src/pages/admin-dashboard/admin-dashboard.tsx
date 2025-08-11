import { type JSX } from "react";

import { Sidebar, Table } from "~/libs/components/components.js";
import { createColumns } from "~/libs/components/table/libs/constants/column.constants.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/navigation-items.constant.js";
import { useCallback, useMemo } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const AdminDashboard = (): JSX.Element => {
	const data = [
		{
			createdAt: "3 Dec 2023",
			id: 1,
			name: "Lviv Central Park",
		},
		{
			createdAt: "5 Dec 2023",
			id: 2,
			name: "Kyiv Botanical Garden",
		},
		{
			createdAt: "10 Dec 2023",
			id: 3,
			name: "Odesa Shevchenko Park",
		},
		{
			createdAt: "12 Dec 2023",
			id: 4,
			name: "Dnipro Heroiv Park",
		},
		{
			createdAt: "15 Dec 2023",
			id: 5,
			name: "Kharkiv Gorky Park",
		},
	];

	const handleEdit = useCallback((id: number) => {
		return id;
	}, []);

	const handleDelete = useCallback((id: number) => {
		return id;
	}, []);

	const columns = useMemo(() => {
		return createColumns(handleEdit, handleDelete);
	}, [handleEdit, handleDelete]);

	return (
		<div className={styles["container"]}>
			<Sidebar navigationItems={NAVIGATION_ITEMS} />
			<main className={styles["dashboard"]}>
				<div className={styles["heading"]}>
					<h1 className={styles["title"]}>Dashboard</h1>
					<p className={styles["subtitle"]}>
						Manage points of interest and routes.
					</p>
				</div>
				<Table columns={columns} data={data} title="Routes" />
			</main>
		</div>
	);
};

export { AdminDashboard };
