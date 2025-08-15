import { useState } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useCallback } from "~/libs/hooks/hooks.js";

import { Input } from "../components.js";

type Properties<T extends FieldValues> = {
	autocomplete?: HTMLInputElement["autocomplete"];
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
};

const PasswordInput = <T extends FieldValues>(
	properties: Properties<T>,
): React.JSX.Element => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const type: "password" | "text" = isVisible ? "text" : "password";
	const iconName: "eye" | "eyeOff" = isVisible ? "eyeOff" : "eye";

	const handleIconClick = useCallback(() => {
		setIsVisible(!isVisible);
	}, [isVisible, setIsVisible]);

	return (
		<Input
			iconRight={{
				label: "Password",
				name: iconName,
				onClick: handleIconClick,
			}}
			type={type}
			{...properties}
		/>
	);
};

export { PasswordInput };
