import smartScapesLogo from "~/assets/images/logo.svg";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";
import { type NavigationItem } from "~/libs/types/types.js";

import { SidebarItem } from "./libs/components/components.js";
import { KeyboardKey } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	navigationItems: NavigationItem[];
};

const Sidebar = ({ navigationItems }: Properties): React.JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClick = useCallback((): void => {
		setIsOpen((previous) => !previous);
	}, [setIsOpen]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === KeyboardKey.ESCAPE) {
				setIsOpen(false);
			}
		},
		[setIsOpen],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);

		return (): void => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [setIsOpen, handleKeyDown]);

	return (
		<div className={styles["container"]}>
			<div className={styles["drawer"]} data-open={isOpen}>
				<div className={styles["button-container"]}>
					<button
						className={styles["close-button"]}
						data-open={isOpen}
						onClick={handleClick}
						type="button"
					>
						<span className={styles["burger-icon"]} />
					</button>

					<Link to={AppRoute.ROOT}>
						<img
							alt="SmartScapes"
							className={styles["logo"]}
							height="24"
							src={smartScapesLogo}
							width="136"
						/>
					</Link>
				</div>
				<div className={styles["sidebar"]}>
					<ul className={styles["navigation-list"]}>
						{navigationItems.map((item) => (
							<SidebarItem
								href={item.href}
								icon={item.icon}
								key={item.icon}
								label={isOpen ? item.label : ""}
							/>
						))}
					</ul>
				</div>
			</div>
			{isOpen && (
				<button
					aria-label="Close sidebar"
					className={styles["backdrop"]}
					onClick={handleClick}
				/>
			)}
		</div>
	);
};

export { Sidebar };
