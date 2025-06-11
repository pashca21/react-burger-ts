/// <reference types="cypress" />

describe('Website', () => {
	it('should open Homepage', () => {
		cy.visit('/');
		cy.contains('Соберите бургер');
		cy.contains('Булки');
		cy.contains('Соусы');
		cy.contains('Начинки');
		cy.contains('булка');
	});

	it('should open Feed', () => {
		cy.visit('/feed');
		cy.contains('Выполнено за все время');
		cy.contains('бургер');
	});

	it('should open Login', () => {
		cy.visit('/login');
		cy.contains('Вход');
	});

	it('should open Register', () => {
		cy.visit('/register');
		cy.contains('Регистрация');
	});

	it('should open Forgot Password', () => {
		cy.visit('/forgot-password');
		cy.contains('Восстановление пароля');
	});

});
