import { Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useMemo,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions as categoriesActions } from "~/modules/categories/categories.js";

import { createColumns } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const DEFAULT_TOTAL_PAGES = 1;

const ManageCategories = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const categories = useAppSelector((state) => state.categories.categories);
	const categoriesMeta = useAppSelector((state) => state.categories.meta);
	const categoriesStatus = useAppSelector(
		(state) => state.categories.dataStatus,
	);

	const paginationCategories = usePagination({
		meta: categoriesMeta,
		queryParameterPrefix: "category",
	});

	const { page, pageSize } = paginationCategories;

	const { total = 0, totalPages = DEFAULT_TOTAL_PAGES } = categoriesMeta ?? {};

	useEffect(() => {
		void dispatch(categoriesActions.getAll({ page, perPage: pageSize }));
	}, [dispatch, page, pageSize]);

	const columns = useMemo(() => {
		return createColumns();
	}, []);

	return (
		<main className={styles["container"]}>
			<div className={styles["heading"]}>
				<h1 className={styles["title"]}>Manage Categories</h1>
			</div>

			<Table
				columns={columns}
				data={categories}
				isLoading={categoriesStatus === DataStatus.PENDING}
				paginationSettings={paginationCategories}
				totalItems={total}
				totalPages={totalPages}
			/>
		</main>
	);
};

export { ManageCategories };
