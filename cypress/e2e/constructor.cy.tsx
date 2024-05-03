import Cypress from 'cypress';

describe('[1] Проверяем работу конструктора', () => {
    beforeEach(() => {
        const BASE_URL = 'http://localhost:4000';
        cy.visit(BASE_URL);
        cy.intercept('GET', `${BASE_URL}/ingredients`, {
            fixture: 'ingredients.json'
        }).as('getIngredients');
    });
    it('Проверям добавление булки и начинки', () => {
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093d]').children('button').click();
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093e]').children('button').click();
    });
});

describe('[2] Проверяем работу модального окна с детальной ифнормацией по ингредиенту', () => {
    beforeEach(() => {
        const BASE_URL = 'http://localhost:4000';
        cy.visit(BASE_URL);
        cy.intercept('GET', `${BASE_URL}/ingredients`, {
            fixture: 'ingredients.json'
        }).as('getIngredients');
    });
    it('Проверяем открытие модального окна', () => {
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093d]').click();
    });
    it('Проверяем закрытие модального окна по нажатию на кнопку', () => {
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093d]').click();
        cy.get('[data-cy="modal-close"]').click();
    });
    it('Проверяем закрытие модального окна по нажатию на оверлей', () => {
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093d]').click();
        cy.get('[data-cy= "overlay"]').click({force: true});
    });
    it('Проверяем отображение данных выбранного ингредиента', () => {
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093d]').click();
        cy.get('[data-cy= "modal"]').should('contain.text', 'Детали ингредиента Флюоресцентная булка R2-D3Калории, ккал643Белки, г44Жиры, г26Углеводы, г85');
      
    });
});

describe('[3] Проверяем оформление заказа', () => {
    beforeEach(() => {
        const BASE_URL = 'http://localhost:4000';
        cy.visit(BASE_URL);
        cy.intercept('GET', `${BASE_URL}/ingredients`, {
            fixture: 'ingredients.json'
        }).as('getIngredients');
        cy.intercept('GET', `${BASE_URL}/auth/user`, {
            fixture: 'user.json'
        });
        cy.intercept('POST', `${BASE_URL}/orders`, {
            fixture: 'order.json'
        }).as('postOrder');
        cy.setCookie('accessToken', 'testAccessToken');
        localStorage.setItem('refreshToken', 'testRefreshToken');
    });
    afterEach(() => {
        cy.clearCookies();
        localStorage.clear();
    });
    it('Проверям оформление заказа', () => {
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093d]').children('button').click();
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093e]').children('button').click();
        cy.get('[data-cy = 643d69a5c3f7b9001cfa093e]').children('button').click();
        cy.get('button').contains('Оформить заказ').click();
        cy.get('[data-cy="orderNumber"]').should('contain.text', '39188');
    });
});
