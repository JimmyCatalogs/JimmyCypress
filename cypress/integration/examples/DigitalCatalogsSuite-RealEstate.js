/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'



describe('Dynalog 4.0 Test Suite - Real Estate (Beachfront Realty)', function () {

    beforeEach(function () { // runs before each test
        // Load data from json file
        cy.fixture('realEstate').then(function (data) {
            this.data = data
            //cy.visit(`https://digital.catalogshub.com/version/${this.data.dynalogVersion}`) // Navigate to Dynalog
            //cy.wait(1000)
        })

    })
    
    it('Quick View + Lead Form', function () {
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
            cy.get('.awssld__content > img').should("exist") // Assert image
            cy.get('.productInfo').should("not.be.empty")  // Description
            cy.get('.productDescription > h4').should("not.be.empty") // Title 

            // Lead Form
            cy.get('.button').click()
            cy.get('[aria-label="Call Form"]').should("exist")
            cy.get('[aria-label="Call Form"]').find("h2").should("have.text", "Call Form") // "Call Form" title
            cy.get('[aria-label="Call Form"]').find("p").should("contain.text", `${this.data.phoneNumber}`) // Tests correct phone number
            // TO DO: Related Products

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
            // TO DO: Related Products

        }
    })
    /*
    it('Play Video', function () {
        cy.visit('digital.catalogshub.com/version/39939')
        //cy.wait(1000)
        cy.get('img[alt="next"').click()
        cy.get('.hover_rect').eq(0).children().click()
        //cy.wait(1000)
        cy.frameLoaded("#widget2")
        // Cypress cannot affirm cross-origin frames, like embedded YT videos. Tried disablng chrome security in cypress.json, but it resulted in an app issue.
        //cy.iframe().find('.ytp-title-text').should('have.text',this.data.videoTitle)  
    })

    
    */


})