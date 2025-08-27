import { Button, Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	usePagination,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as categoriesActions,
	type CategoryCreateRequestDto,
} from "~/modules/categories/categories.js";

import { CreateCategoryModal } from "./libs/components/components.js";
import { createColumns } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const DEFAULT_TOTAL_PAGES = 1;

const ManageCategories = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
		useState<boolean>(false);

	const categories = useAppSelector((state) => state.categories.categories);
	const categoriesMeta = useAppSelector((state) => state.categories.meta);
	const categoriesStatus = useAppSelector(
		(state) => state.categories.dataStatus,
	);
	const createCategoryStatus = useAppSelector(
		(state) => state.categories.createStatus,
	);

	const handleModalToggle = useCallback(() => {
		setIsCreateCategoryModalOpen((previous) => !previous);
	}, []);

	const handleSubmit = useCallback(
		(payload: CategoryCreateRequestDto): void => {
			void dispatch(categoriesActions.create(payload));
		},
		[dispatch],
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

	useEffect(() => {
		if (createCategoryStatus === DataStatus.FULFILLED) {
			setIsCreateCategoryModalOpen(false);
		}
	}, [createCategoryStatus]);

	return (
		<main className={styles["container"]}>
			<h1 className={styles["title"]}>Manage Categories</h1>

			<div className={styles["header"]}>
				<h2 className={styles["header-title"]}>Categories</h2>
				<div>
					<Button
						label="Create category"
						onClick={handleModalToggle}
						type="button"
					/>
				</div>
			</div>

			<CreateCategoryModal
				isOpen={isCreateCategoryModalOpen}
				onClose={handleModalToggle}
				onSubmit={handleSubmit}
			/>

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
