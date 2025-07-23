import { Header, Loader, RouterOutlet } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useEffect, useLocation } from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

const App = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const mockUserWithAvatar = {
		avatarUrl:
			"https://www.imani.sg/wp/wp-content/uploads/2022/09/imani_icon.png",
		firstName: "John",
		lastName: "Smith",
	};
	const mockUserWithoutAvatar = {
		avatarUrl: null,
		firstName: "John",
		lastName: "Smith",
	};
	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	return (
		<div>
			<Loader />
			<Header user={mockUserWithAvatar} />
			<Header user={mockUserWithoutAvatar} />
			<Header user={null} />
			<RouterOutlet />
		</div>
	);
};

export { App };
