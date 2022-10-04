/* eslint-disable no-undef */
/// <reference types='Cypress'/>

describe('App Component', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('base_url'))
    })

    it('Verify Welcome text on Users screen', () => {
            cy.visit(`${Cypress.env('base_url')}/users`)

        cy.get('h1').should('contain', 'Welcome to Users Screen')
    })
})
