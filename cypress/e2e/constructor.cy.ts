/// <reference types="cypress" />

const SELECTOR_CONSTRUCTOR_BUTTON = '[data-test="header-constructor-button"]';
const SELECTOR_BUN = '[data-test="bun"]';
const SELECTOR_CONSTRUCTOR_DROP_TARGET = '[data-test="constructor-drop-target"]';
const SELECTOR_CONSTRUCTOR_BUN = '[data-test="constructor-bun"]';
const SELECTOR_MAIN = '[data-test="main"]';
const SELECTOR_SAUCE = '[data-test="sauce"]';
const SELECTOR_EMAIL_INPUT = '[data-test="email-input"]';
const SELECTOR_PASSWORD_INPUT = '[data-test="password-input"]';
const SELECTOR_LOGIN_BUTTON = '[data-test="login-button"]';
const SELECTOR_CREATE_ORDER_BUTTON = '[data-test="create-order-button"]';
const SELECTOR_MODAL_CLOSE_ICON = '[data-test="modal-close-icon"]';
const SELECTOR_MODAL = '[data-test="modal"]';

describe('Constructor', () => {

	it('should open Constructor', () => {
		cy.fixture('ingredients.json').then((ingredients) => {
			// @ts-ignore
			cy.intercept('GET', '/api/ingredients', {
				statusCode: 200,
				body: ingredients,
			});
		}).as('getIngredientsRequest');
		cy.visit('/');
		cy.contains('Соберите бургер');
		cy.contains('Булки');
		cy.contains('Соусы');
		cy.contains('Начинки');
		cy.contains('булка');
	});

	it('should open an ingredient modal', () => {
		cy.fixture('ingredients.json').then((ingredients) => {
			// @ts-ignore
			cy.intercept('GET', '/api/ingredients', {
				statusCode: 200,
				body: ingredients,
			});
		}).as('getIngredientsRequest');
		cy.visit('/');
		cy.get(SELECTOR_MAIN).first().click();
		cy.contains('Детали ингредиента');
		cy.get(SELECTOR_MODAL_CLOSE_ICON).click();
		cy.get(SELECTOR_MODAL).should('not.exist');
	});

	it('should D&D a bun', () => {
		cy.fixture('ingredients.json').then((ingredients) => {
			// @ts-ignore
			cy.intercept('GET', '/api/ingredients', {
				statusCode: 200,
				body: ingredients,
			});
		}).as('getIngredientsRequest');
		cy.visit('/');
		cy.get(SELECTOR_BUN).first().trigger('dragstart');
		cy.get(SELECTOR_CONSTRUCTOR_DROP_TARGET).trigger('drop');
		cy.get(SELECTOR_CONSTRUCTOR_BUN).should('exist');
	});

	it('should create an order', () => {
		cy.fixture('ingredients.json').then((ingredients) => {
			// @ts-ignore
			cy.intercept('GET', '/api/ingredients', {
				statusCode: 200,
				body: ingredients,
			});
		}).as('getIngredientsRequest');
		cy.visit('/login');
		cy.contains('Вход');

		cy.get(SELECTOR_EMAIL_INPUT).type('test@example.com');
		cy.get(SELECTOR_PASSWORD_INPUT).type('password123');

		// @ts-ignore
		cy.intercept('POST', '/api/auth/login', {
			statusCode: 200,
			body: {
				success: true,
				accessToken: 'mock-token',
				refreshToken: 'mock-refresh',
				user: { email: 'test@example.com', name: 'Test User' },
			},
		}).as('loginRequest');
		cy.get(SELECTOR_LOGIN_BUTTON).click();

		// @ts-ignore
		cy.intercept('GET', '/api/auth/user', {
			statusCode: 200,
			body: { success: true, user: { email: 'test@example.com', name: 'Test User' } },
		}).as('getUserRequest');
		// @ts-ignore
		cy.intercept('POST', '/api/auth/token', {
			statusCode: 200,
			body: { success: true, accessToken: 'mock-token', refreshToken: 'mock-refresh' },
		}).as('updateAccessTokenRequest');
		cy.get(SELECTOR_CONSTRUCTOR_BUTTON).click();

		// @ts-ignore
		cy.intercept('GET', '/api/auth/user', {
			statusCode: 200,
			body: { success: true, user: { email: 'test@example.com', name: 'Test User' } },
		}).as('getUserRequest');
		// @ts-ignore
		cy.intercept('POST', '/api/auth/token', {
			statusCode: 200,
			body: { success: true, accessToken: 'mock-token', refreshToken: 'mock-refresh' },
		}).as('updateAccessTokenRequest');

		cy.get(SELECTOR_BUN).first().trigger('dragstart');
		cy.get(SELECTOR_CONSTRUCTOR_DROP_TARGET).trigger('drop');

		cy.get(SELECTOR_MAIN).first().trigger('dragstart');
		cy.get(SELECTOR_CONSTRUCTOR_DROP_TARGET).trigger('drop');

		cy.get(SELECTOR_SAUCE).first().trigger('dragstart');
		cy.get(SELECTOR_CONSTRUCTOR_DROP_TARGET).trigger('drop');

		cy.contains('Оформить заказ').should('exist');

		// @ts-ignore
		cy.intercept('GET', '/api/auth/user', {
			statusCode: 200,
			body: { success: true, user: { email: 'test@example.com', name: 'Test User' } },
		}).as('getUserRequest');
		// @ts-ignore
		cy.intercept('POST', '/api/auth/token', {
			statusCode: 200,
			body: { success: true, accessToken: 'mock-token', refreshToken: 'mock-refresh' },
		}).as('updateAccessTokenRequest');
		// @ts-ignore
		cy.intercept('POST', '/api/orders', {
			statusCode: 200,
			body: { success: true, name: 'Бургер', order: { number: 12345 } },
		}).as('createOrderRequest');
		cy.get(SELECTOR_CREATE_ORDER_BUTTON).click();

		cy.contains('Детали заказа').should('exist');
	});

});
