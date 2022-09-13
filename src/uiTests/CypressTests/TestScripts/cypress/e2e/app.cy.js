/* eslint-disable no-undef */
/// <reference types='Cypress'/>

describe('App Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Verify Welcome text on Users screen', () => {
        // beforeEach(() => {
            cy.visit('http://localhost:3000/users')
        // })

        cy.get('h1').should('contain', 'Welcome to Users Screen')
    })
})