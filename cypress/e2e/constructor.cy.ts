/// <reference types="cypress" />

describe('Constructor', () => {

	it('should open Constructor', () => {
		cy.visit('/');
		cy.contains('Соберите бургер');
		cy.contains('Булки');
		cy.contains('Соусы');
		cy.contains('Начинки');
		cy.contains('булка');
	});

	it('should D&D a bun', () => {
		cy.visit('/');
		cy.get('[data-test="bun"]').first().trigger('dragstart');
		cy.get('[data-test="constructor-drop-target"]').trigger('drop');
		cy.get('[data-test="constructor-bun"]').should('exist');
	});

	it('should create an order', () => {
		cy.visit('/');

		// @ts-ignore
		cy.intercept('POST', '/api/auth/login', {
			statusCode: 200,
			body: {
				success: true,
				accessToken: 'mock-token',
				refreshToken: 'mock-refresh',
				user: { email: 'test@example.com', name: 'Test User' },
			},
		});

		// @ts-ignore
		cy.intercept('GET', '/api/auth/user', {
			statusCode: 200,
			body: { success: true, user: { email: 'test@example.com', name: 'Test User' } },
		});

		// @ts-ignore
		cy.intercept('POST', '/api/auth/token', {
			statusCode: 200,
			body: { success: true, accessToken: 'mock-token', refreshToken: 'mock-refresh' },
		});

		cy.window().then((win: Window) => {
			win.localStorage.setItem('accessToken', 'mock-token');
			cy.setCookie('refreshToken', 'mock-refresh');
		});

		cy.visit('/login');
		cy.get('[data-test="email-input"]').type('test@example.com');
		cy.get('[data-test="password-input"]').type('password123');
		cy.get('[data-test="login-button"]').click();

		// @ts-ignore
		cy.intercept('GET', '/api/auth/user', {
			statusCode: 200,
			body: { success: true, user: { email: 'test@example.com', name: 'Test User' } },
		});
		cy.visit('/profile');
		cy.contains('История заказов').should('exist');

		// @ts-ignore
		cy.intercept('GET', '/api/auth/user', {
			statusCode: 200,
			body: { success: true, user: { email: 'test@example.com', name: 'Test User' } },
		});
		cy.visit('/');

		cy.get('[data-test="bun"]').first().trigger('dragstart');
		cy.get('[data-test="constructor-drop-target"]').trigger('drop');

		cy.get('[data-test="main"]').first().trigger('dragstart');
		cy.get('[data-test="constructor-drop-target"]').trigger('drop');

		cy.get('[data-test="sauce"]').first().trigger('dragstart');
		cy.get('[data-test="constructor-drop-target"]').trigger('drop');

		cy.contains('Оформить заказ').should('exist');

		// @ts-ignore
		cy.intercept('POST', '/api/orders', {
			statusCode: 200,
			body: { success: true, name: 'Бургер', order: { number: 12345 } },
		});
		cy.get('[data-test="create-order-button"]').click();

		cy.contains('Детали заказа').should('exist');
	});

	it('should open an ingredient modal', () => {
		cy.visit('/');
		cy.get('[data-test="main"]').first().click();
		cy.contains('Детали ингредиента');
		cy.get('[data-test="modal-close-icon"]').click();
		cy.get('[data-test="modal"]').should('not.exist');
	});

});
