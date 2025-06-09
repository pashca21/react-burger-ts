import {
	FORGOT_PASSWORD_SUCCESS,
	RESET_PASSWORD_SUCCESS,
	TPasswordActions,
} from '@services/actions/password';
import {
	passwordReducer,
	passwordInitialState,
} from './password';

describe('password reducer', () => {
	it('should return the initial state', () => {
		expect(
			passwordReducer(undefined, {} as TPasswordActions)
		).toEqual(
			passwordInitialState
		);
	});

	it('should handle FORGOT_PASSWORD_SUCCESS', () => {
		expect(
			passwordReducer(passwordInitialState, {
				type: FORGOT_PASSWORD_SUCCESS,
			})
		).toEqual({
			...passwordInitialState,
			isSent: true,
		});
	});

	it('should handle RESET_PASSWORD_SUCCESS', () => {
		expect(
			passwordReducer(passwordInitialState, {
				type: RESET_PASSWORD_SUCCESS,
			})
		).toEqual({
			...passwordInitialState,
			isSent: false,
		});
	});

});
