/// <reference types="Cypress" />






describe('Dynalog 4.0 Test Suite - Portal functions', () => {

    beforeEach(function () {
        cy.fixture('portal').then(function (data) {
            this.data = data
            cy.visit(this.data.baseUrl)
            // Login
            cy.get('[data-test="username-input"]').type(Cypress.env('username'))
            cy.get('[data-test="sign-in-password-input"]').type(Cypress.env('password'))
            cy.get('[data-test="sign-in-sign-in-button"]').click()
        })
    })

    afterEach(function () {

    })

    it('Add/delete product', () => {
        cy.viewport(1920,1080)
        cy.wait(5000)
        cy.get('.dx-texteditor-input').eq(0).type('jimmyw')
        cy.get('.dx-item-content').eq(0).click()
        //cy.get('.dx-dropdowneditor-icon').eq(0).select('jimmyw@catalogs.com')
        cy.get('dx-texteditor-input').eq(1).type('Nature City')
        cy.get('.dx-item-content').eq(0).click()
        cy.get('dx-texteditor-input').eq(2).type('Nature City')
        cy.get('.dx-item-content').eq(0).click()


        // Logout
        cy.get('[role="listbox"]').find('.text').click()
        cy.get('[role="listbox"]').find('.item').eq(1).click()
        cy.wait(1000)
        cy.get('[data-test="username-input"]').should("not.exist")
    });
});