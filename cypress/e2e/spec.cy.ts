describe('Website', () => {
	it('Homepage', () => {
		cy.visit('/');
		cy.contains('Соберите бургер');
		cy.contains('Булки');
		cy.contains('Соусы');
		cy.contains('Начинки');
		cy.contains('булка');
	});

	it('Feed', () => {
		cy.visit('/feed');
		cy.contains('Выполнено за все время');
		cy.contains('бургер');
	});
	
	it('Login', () => {
		cy.visit('/login');
		cy.contains('Вход');
		// cy.get('input[name="email"]').type('vdovchenko.pavel@gmail.com');
		// cy.get('input[name="password"]').type('96d7e5bb-3a7e-4f3f-a0a1-2df2d36299d1');
		// cy.get('button[type="button"]').first().click();
		// cy.url().should('include', '/profile');
		// cy.contains('Профиль');
	});

	it('Register', () => {
		cy.visit('/register');
		cy.contains('Регистрация');
		// cy.get('input[name="name"]').type('Pavel');
		// cy.get('input[name="email"]').type('' + Date.now() + '@example.com');
		// cy.get('input[name="password"]').type('96d7e5bb-3a7e-4f3f-a0a1-2df2d36299d1');
		// cy.get('button[type="button"]').first().click();
		// cy.url().should('include', '/profile');
		// cy.contains('Профиль');
	});

	it('Forgot Password', () => {
		cy.visit('/forgot-password');
		cy.contains('Восстановление пароля');
	});

});
