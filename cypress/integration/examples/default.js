/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'


describe('Dynalog 4.0 Test Suite - Nature City (Dummy Version)', function () {

    beforeEach(function () { // runs before each test
        // Load data from json file
        cy.fixture('default').then(function (data) {
            this.data = data
            //cy.visit(`https://digital.catalogshub.com/version/${this.data.dynalogVersion}`) // Navigate to Dynalog
            //cy.wait(1000)
        })
    })

    it('Quick View', function () {
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
    /*
    it('Linkout'), function () {
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
            cy.get('.button').invoke('attr','target','_self').click() // Remove target attribute so url does not linkout in new tab
        } 
    }
    */
    it('Lead Form', function () {
        for (var i = 0; i < this.data.viewports.length; i++) {
            cy.viewport(this.data.viewports[i].width, this.data.viewports[i].height)
            cy.visit(`https://digital.catalogshub.com/version/${this.data.dynalogVersionCallForm}`) // Navigate to Dynalog w/ Call Form
            if (this.data.viewports[i].mobile) { // Click through an additional page, because mobile doesn't have double spreads
                cy.get('[alt="next"]').click()
                cy.wait(1000)
            }
            cy.get('[alt="next"]').click()
            cy.wait(1000)


            // Quick view
            cy.get('.productWrapper').eq(0).click() // Click on product image
            cy.wait(2000)

            // Lead Form
            cy.get('.button').click()
            cy.get('[aria-label="Call Form"]').should("exist")
            cy.get('[aria-label="Call Form"]').find("h2").should("have.text", "Call Form") // "Call Form" title
            cy.get('[aria-label="Call Form"]').find("p").should("contain.text", `${this.data.phoneNumber}`) // Tests correct phone number  
        }
    })

    it('Navigate to Category', function () {
        for (var i = 0; i < this.data.viewports.length; i++) {
            cy.viewport(this.data.viewports[i].width, this.data.viewports[i].height)
            cy.visit(`https://digital.catalogshub.com/version/${this.data.dynalogVersion}`) // Navigate to Dynalog

            cy.get('.bm-burger-button').click()
            cy.get('.categoryDropdown').select(this.data.categoryName)
            if (this.data.viewports[i].mobile) {    // Mobile  pages have 2 products
                cy.get('.productWrapper:visible').should('have.length', 2)
            }
            else {  // Desktop pages have 4 products
                cy.get('.productWrapper:visible').should('have.length', 4)
            }
            cy.get('.categoryName').should('have.text', `${this.data.categoryName}`)
            cy.get('.backButton').click()
            cy.get('.categoryName').should('not.exist')

        }
    })
})