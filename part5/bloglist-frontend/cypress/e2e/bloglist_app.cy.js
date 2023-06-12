describe('Bloglist app', function() {
  let user
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('base_backend_url')}/testing/reset`)

    user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', `${Cypress.env('base_backend_url')}/users/`, user) 

    cy.visit(Cypress.env('base_frontend_url'))
  })

  // Check login form is displayed with all fields
  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
    cy.get('button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type(user.password)
      cy.get('button').contains('login').click()

      cy.get('h1').contains('Blog')
      cy.contains(`${user.name} logged in`)
    })

    it('fails with incorrect credentials', function() {
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type(user.password.slice(0, 4))
      cy.get('button').contains('login').click()

      cy.contains('Wrong credentials')
      cy.get('#error-message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    const blog = {
      title: 'My New Blog Title',
      url: 'http://test.com/postUrl',
      author: 'Myself'
    }

    beforeEach(function() {
      cy.request('POST', `${Cypress.env('base_backend_url')}/login`, {
        username: user.username, password: user.password
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit(Cypress.env('base_frontend_url'))
      })
    })

    it('A blog can be created', function() {
      cy.get('button').contains('create blog').click()
      cy.get('input[placeholder="enter title"]').type(blog.title)
      cy.get('input[placeholder="enter url"]').type(blog.url)
      cy.get('input[placeholder="enter author"]').type(blog.author)
      cy.get('input[value="create"]').click()
      cy.get('#success-message')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-color', 'rgb(0, 128, 0)')
      .and('contain.text', `a new blog ${blog.title} by ${blog.author} added`)
      cy.get('.blog').contains(blog.title)
    })
  })
})