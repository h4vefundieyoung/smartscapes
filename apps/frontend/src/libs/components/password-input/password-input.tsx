import { useCallback, useState } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Input } from "../components.js";

type Properties<T extends FieldValues> = {
	autocomplete?: HTMLInputElement["autocomplete"];
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
};

const PasswordInput = <T extends FieldValues>(
	properties: Properties<T>,
): React.JSX.Element => {
	const [isVisible, setVisibility] = useState<boolean>(false);
	const type: "password" | "text" = isVisible ? "text" : "password";
	const icon: "eye" | "eyeOff" = isVisible ? "eyeOff" : "eye";

	const handleIconClick = useCallback(() => {
		setVisibility(!isVisible);
	}, [isVisible, setVisibility]);

	return (
		<Input
			icon={icon}
			onIconClick={handleIconClick}
			type={type}
			{...properties}
		/>
	);
};

export { PasswordInput };
