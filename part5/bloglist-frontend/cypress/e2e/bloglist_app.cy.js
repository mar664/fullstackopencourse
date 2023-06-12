describe('Bloglist app', function() {
  let user
  beforeEach(function() {
    cy.resetDB()

    user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.createUser(user)

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
    const blog1 = {
      title: 'My New Blog Title 1',
      url: 'http://test.com/postUrl',
      author: 'Myself'
    }

    const blog2 = {
      title: 'My New Blog Title 2',
      url: 'http://dffdf.com/postUrl',
      author: 'Billy'
    }

    const blog3 = {
      title: 'My New Blog Title 3',
      url: 'http://test.com/fdjfdfdfrl',
      author: 'You'
    }

    beforeEach(function() {
      cy.login({
        username: user.username, password: user.password
      })
    })

    it('A blog can be created', function() {
      cy.get('button').contains('create blog').click()
      cy.get('input[placeholder="enter title"]').type(blog1.title)
      cy.get('input[placeholder="enter url"]').type(blog1.url)
      cy.get('input[placeholder="enter author"]').type(blog1.author)
      cy.get('input[value="create"]').click()

      cy.get('#success-message')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-color', 'rgb(0, 128, 0)')
      .and('contain.text', `a new blog ${blog1.title} by ${blog1.author} added`)
      cy.get('.blog').contains(blog1.title)
    })

    it('A blog can be liked', function() {
      cy.createBlog(blog1)

      cy.get('.blog-title').contains(blog1.title).parent('.blog').within(() => {
        cy.get('.toggleBlogInfo').click()

        cy.get('.like-button').click()
  
        cy.get('.likes').should('contain.text', 1)
      })
    })

    it('A blog can be be delete by user who created it', function() {
      cy.createBlog(blog1)
      
      cy.get('.blog-title').contains(blog1.title).parent('.blog').within(() => {
        cy.get('.toggleBlogInfo').click()

        cy.get('.remove-blog').click()
      })
      
      cy.get('.blog').should('not.exist')
    })
  })
})