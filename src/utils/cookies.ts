export const setCookie = (
	name: string,
	value: string,
	props?: { [key: string]: any }
) => {
	window.document.cookie = `${name}=${value};${props ? props : ''}`;
};
