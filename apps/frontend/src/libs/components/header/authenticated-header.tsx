import { type JSX } from "react";

import { AppRoute } from "~/libs/enums/enums.js";
import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useNavigate,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import { Avatar } from "../components.js";
import { UserDropdown } from "../user-dropdown/user-dropdown.js";
import DropdownArrow from "./dropdown-arrow.svg?react";
import { type User } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	user: User;
};

const AuthenticatedHeader = ({ user }: Properties): JSX.Element => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const dropdownReference = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleUserClick = useCallback(() => {
		setIsDropdownOpen((previous) => !previous);
	}, []);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleUserClick();
			}
		},
		[handleUserClick],
	);

	const handleLogout = useCallback(async () => {
		setIsDropdownOpen(false);

		try {
			await dispatch(authActions.logout()).unwrap();
			await navigate(AppRoute.ROOT);
		} catch (error: unknown) {
			throw new Error(
				`Logout failed: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}, [dispatch, navigate]);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (
			dropdownReference.current &&
			!dropdownReference.current.contains(event.target as Node)
		) {
			setIsDropdownOpen(false);
		}
	}, []);

	const handleEscape = useCallback((event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setIsDropdownOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [handleClickOutside, handleEscape]);

	return (
		<div className={styles["user-profile-wrapper"]} ref={dropdownReference}>
			<div
				className={styles["user-info"]}
				onClick={handleUserClick}
				onKeyDown={handleKeyDown}
				role="button"
				tabIndex={0}
			>
				<Avatar user={user} />
				<div className={styles["name"]}>
					{user.firstName} {user.lastName}
				</div>
				<DropdownArrow
					className={combineClassNames(
						styles["dropdown-arrow"],
						isDropdownOpen && styles["open"],
					)}
				/>
			</div>
			{isDropdownOpen && <UserDropdown onLogout={handleLogout} />}
		</div>
	);
};

export { AuthenticatedHeader };
