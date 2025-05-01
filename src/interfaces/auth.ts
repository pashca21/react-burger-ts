// TODO: delete
// export interface IUser {
// 	email: string;
// 	name: string;
// }

// export interface IAuthResponse {
// 	success: boolean;
// 	data: {
// 		user: IUser;
// 		accessToken: string;
// 		refreshToken: string;
// 	};
// }

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
