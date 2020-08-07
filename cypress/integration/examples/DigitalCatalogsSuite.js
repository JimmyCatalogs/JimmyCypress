/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('digital.catalogshub test suite', function () {
    
    beforeEach(function () { // runs before each test
        // Load data from json file
        cy.fixture('default').then(function (data) {
            this.data = data
        })
    })
    
    it('Quick View', function() {
        cy.visit('https://digital.catalogshub.com/version/39939/page/6') // Navigate to specific page
        cy.wait(1000)
        cy.get('.hover_image').eq(0).children().click()                 // Click on product image
        cy.get('.button').should("have.text","click for full details")  // Assert details button
        cy.get('.awssld__content').children().should("have.property","src") // Assert image
        
    })
    
    
    
    it('Navigate to Category', function () {
        cy.visit('digital.catalogshub.com/version/39939')
        cy.get('.bm-burger-button').click()
        cy.get('.categoryDropdown').select(this.data.categoryName)
        cy.get('.productWrapper:visible').should('have.length', 4)
    })

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

    



})