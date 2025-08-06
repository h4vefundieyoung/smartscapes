import {
	Button,
	Header,
	Loader,
	Select,
	Sidebar,
} from "~/libs/components/components.js";
import { type SelectOption } from "~/libs/components/select/libs/types/types.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/constants.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { mockImages } from "../../libs/components/carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../../libs/components/carousel/carousel.js";
import styles from "./styles.module.css";

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const Dashboard = (): React.JSX.Element => {
	const mockUserWithoutAvatar: UserAuthResponseDto & {
		avatarUrl?: null | string;
	} = {
		avatarUrl: null,
		email: "john.smith@example.com",
		firstName: "John",
		id: 1,
		lastName: "Smith",
	};

	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];

	const { control } = useAppForm<FormValues>({
		defaultValues: {
			multiColors: [],
			singleColor: null,
		},
	});

	return (
		<div className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Header user={mockUserWithoutAvatar} />
				<div className={styles["sidebar-container"]}>
					<Sidebar navigationItems={NAVIGATION_ITEMS} />
				</div>
				<Loader />
				<div className={styles["button-container"]}>
					<Button label="Button for test" type="button" />
				</div>
				<div className={styles["carousel-container"]}>
					<Carousel images={mockImages} />
				</div>
				<div className={styles["select-container"]}>
					<Select
						control={control}
						label="Single select"
						name="singleColor"
						options={colorOptions}
					/>
					<Select
						control={control}
						isMulti
						label="Multi select"
						name="multiColors"
						options={colorOptions}
					/>
				</div>
			</div>
		</div>
	);
};

export { Dashboard };
