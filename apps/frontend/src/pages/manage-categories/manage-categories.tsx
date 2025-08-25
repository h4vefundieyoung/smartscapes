import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as categoriesActions } from "~/modules/categories/categories.js";

const ManageCategories = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector((state) => state.categories.categories);

	useEffect(() => {
		void dispatch(categoriesActions.getAll());
	}, [dispatch]);

	return (
		<ul>
			{categories.length > 0 ? (
				categories.map((category) => <li key={category.id}>{category.name}</li>)
			) : (
				<li>No categories</li>
			)}
		</ul>
	);
};

export { ManageCategories };
