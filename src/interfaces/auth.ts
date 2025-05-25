export interface IAuth {
	accessTokenExpiresAt: number;
	isAuth: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
}
