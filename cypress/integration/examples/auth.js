/// <reference types="Cypress" />


describe('Dynalog 4.0 Test Suite - Authentication', () => {

    beforeEach(function (){
        cy.fixture('auth').then(function (data) {
            this.data = data
            cy.visit(this.data.baseUrl)
        })
    })

        

    it('Incorrect user/pass', () => {
        cy.get('[data-test="username-input"]').type(Cypress.env('username'))
        cy.get('[data-test="sign-in-password-input"]').type('wrongpassword')
        cy.get('[data-test=sign-in-sign-in-button]').click()
        cy.wait(1000)
        cy.get('[data-test="authenticator-error').should('have.text','Incorrect username or password')
    });

    it('Login + Logout', () => {
        // Login
        cy.get('[data-test="username-input"]').type(Cypress.env('username'))
        cy.get('[data-test="sign-in-password-input"]').type(Cypress.env('password'))
        cy.get('[data-test="sign-in-sign-in-button"]').click()
        cy.wait(1000)
        cy.get('[role="listbox"]').find('.text').should('have.text',Cypress.env('username'))
        
        // Logout
        cy.get('[role="listbox"]').find('.text').click()
        cy.get('[role="listbox"]').find('.item').eq(1).click()
        cy.wait(1000)
        cy.get('[data-test="username-input"]').should("exist")
    });
});