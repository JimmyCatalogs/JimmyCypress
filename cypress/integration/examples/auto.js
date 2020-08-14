/// <reference types="Cypress" />
describe('Dynalog 4.0 Test Suite - Benson Nissan', function () {

    beforeEach(function () { // runs before each test
        // Load data from json file
        cy.fixture('auto').then(function (data) {
            this.data = data
        })
    })

    it('All-in-one test', function () {
        for (var i = 0; i < this.data.viewports.length; i++) {
            cy.viewport(this.data.viewports[i].width, this.data.viewports[i].height)

            // Navigate to Dynalog inside cover
            cy.visit(`https://digital.catalogshub.com/version/${this.data.dynalogVersion}`)
            cy.get('[alt="next"]').click()
            cy.wait(1000)
            let p = 0;
            if (this.data.viewports[i].mobile == true) {
                p = 1; // Page index. Starts at 1 for mobile.
            }
            else {
                p = 2; // Page index. Starts at 2 for desktop.
            }
            for (p; p <= this.data.lastPage; p++) {

                // Iterate through products on the page
                cy.get('.productWrapper:visible').each(($el, index, list) => {
                    testQuickView(index)
                    cy.wait(1000)
                })
                cy.get('[alt="next"]').click() // Next page
                if (this.data.viewports[i].mobile == false) {
                    p++; // Desktop increments two pages at a time, so page index is increased again
                }
            }
        }
    })
})

// Test the product's quick view info is valid
function testQuickView(index) {
    cy.get('.productWrapper').eq(index).as('product')
    cy.get('@product').click() // Click on product image
    cy.wait(1000)
    cy.get('.button').should("have.text", "click for full details") // Details button
    cy.get('.awssld__content > img').should("exist") // Image
    cy.get('.productInfo').should("exist")  // Description - Change to "should not be empty?"
    cy.get('.productDescription > h4').should("not.be.empty") // Title 
    cy.get('.related-grid').children().should('have.length.at.least', 1) // Related products
    cy.get('.closeModal').click() // Close quick view
}