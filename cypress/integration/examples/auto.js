/// <reference types="Cypress" />
describe('Dynalog 4.0 Test Suite - Benson Nissan', function () {

    beforeEach(function () { // runs before each test
        // Load data from json file
        cy.fixture('default').then(function (data) {
            this.data = data
            //cy.visit(`https://digital.catalogshub.com/version/${this.data.dynalogVersion}`) // Navigate to Dynalog
            //cy.wait(1000)
        })
    })

    it('All-in-one test', function () {
        for (var i = 0; i < this.data.viewports.length; i++) {
            cy.viewport(this.data.viewports[i].width, this.data.viewports[i].height)
            cy.visit(`https://digital.catalogshub.com/version/${this.data.dynalogVersion}`) // Navigate to Dynalog
            if (this.data.viewports[i].mobile) { // Click through an additional page, because mobile doesn't have double spreads
                cy.get('[alt="next"]').click()
                cy.wait(1000)
            }
            cy.get('[alt="next"]').click()
            cy.wait(1000)
            // Quick view
            cy.get('.productWrapper').eq(0).click() // Click on product image
            cy.wait(2000)
            cy.get('.button').should("have.text", "click for full details") // Details button
            cy.get('.awssld__content > img').should("exist") // Image
            cy.get('.productInfo').should("not.be.empty")  // Description
            cy.get('.productDescription > h4').should("not.be.empty") // Title 
            cy.get('.related-grid').children().should('have.length.at.least', 1) // Related products
        }
    })