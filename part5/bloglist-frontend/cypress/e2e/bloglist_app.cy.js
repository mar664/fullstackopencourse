describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('base_backend_url')}/testing/reset`)
    cy.visit(Cypress.env('base_frontend_url'))
  })

  // Check login form is displayed with all fields
  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
    cy.get('button').contains('login')
  })
})