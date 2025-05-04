import { ChangeEvent, useState } from 'react';

export const useForm = <T extends { [key: string]: string }>(
	baseForm: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void] => {
	const [form, setForm] = useState<T>(baseForm);

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const element = e.target;
		setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
	};

	return [form, handleChange];
};
