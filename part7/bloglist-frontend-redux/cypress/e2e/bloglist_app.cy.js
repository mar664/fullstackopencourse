describe("Bloglist app", function () {
  let user1;
  let user2;
  beforeEach(function () {
    cy.resetDB();

    user1 = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };

    user2 = {
      name: "Matt Jones",
      username: "mjones",
      password: "mypass&8df",
    };

    cy.createUser(user1);
    cy.createUser(user2);

    cy.visit(Cypress.env("base_frontend_url"));
  });

  // Check login form is displayed with all fields
  it("Login form is shown", function () {
    cy.contains("Login");
    cy.get('input[name="Username"]');
    cy.get('input[name="Password"]');
    cy.get("button").contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get('input[name="Username"]').type(user1.username);
      cy.get('input[name="Password"]').type(user1.password);
      cy.get("button").contains("login").click();

      cy.get("h1").contains("Blog");
      cy.contains(`${user1.name} logged in`);
    });

    it("fails with incorrect credentials", function () {
      cy.get('input[name="Username"]').type(user1.username);
      cy.get('input[name="Password"]').type(user1.password.slice(0, 4));
      cy.get("button").contains("login").click();

      cy.contains("Wrong credentials");
      cy.get("#error-message")
        .should("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    const blog1 = {
      title: "My New Blog Title 1",
      url: "http://test.com/postUrl",
      author: "Myself",
    };

    const blog2 = {
      title: "My New Blog Title 2",
      url: "http://dffdf.com/postUrl",
      author: "Billy",
    };

    const blog3 = {
      title: "My New Blog Title 3",
      url: "http://test.com/fdjfdfdfrl",
      author: "You",
    };

    beforeEach(function () {
      cy.login({
        username: user1.username,
        password: user1.password,
      });
    });

    it("A blog can be created", function () {
      cy.get("button").contains("create blog").click();
      cy.get('input[placeholder="enter title"]').type(blog1.title);
      cy.get('input[placeholder="enter url"]').type(blog1.url);
      cy.get('input[placeholder="enter author"]').type(blog1.author);
      cy.get('input[value="create"]').click();

      cy.get("#success-message")
        .should("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-color", "rgb(0, 128, 0)")
        .and(
          "contain.text",
          `a new blog ${blog1.title} by ${blog1.author} added`
        );
      cy.get(".blog").contains(blog1.title);
    });

    it("A blog can be liked", function () {
      cy.createBlog(blog1);
      cy.reloadFrontend();

      cy.get(".blog-title")
        .contains(blog1.title)
        .parent(".blog")
        .within(() => {
          cy.get(".toggleBlogInfo").click();

          cy.get(".like-button").click();

          cy.get(".likes").should("contain.text", 1);
        });
    });

    it("A blog can be deleted by user who created it", function () {
      cy.createBlog(blog1);
      cy.reloadFrontend();

      cy.get(".blog-title")
        .contains(blog1.title)
        .parent(".blog")
        .within(() => {
          cy.get(".toggleBlogInfo").click();

          cy.get(".remove-blog").click();
        });

      cy.get(".blog").should("not.exist");
    });

    it("A blog cannot be deleted by user who didn't create it it", function () {
      cy.createBlog(blog1);
      cy.reloadFrontend();

      cy.get(".blog-title").contains(blog1.title).parent(".blog");

      cy.login(user2);

      cy.get(".blog-title")
        .contains(blog1.title)
        .parent(".blog")
        .within(() => {
          cy.get(".toggleBlogInfo").click();

          cy.get(".remove-blog").should("not.exist");
        });
    });

    describe("Check all post are order by most likes", function () {
      const blogs = [
        {
          title: "Blog 1",
          author: "Meb",
          url: "http://example.com/dssdds",
          likes: 10,
        },
        {
          title: "Blog 2",
          author: "Mesd",
          url: "http://example.com/sdsdds",
          likes: 8,
        },
        {
          title: "Blog 3",
          author: "Medf",
          url: "http://example.com/dsds",
          likes: 2,
        },
        {
          title: "Blog 4",
          author: "Med",
          url: "http://example.com/sdffsdsd",
          likes: 5,
        },
      ];

      beforeEach(function () {
        // log in user here
        cy.login(user1);

        for (let blog of blogs) {
          cy.createBlog(blog);
          cy.reloadFrontend();

          cy.get(".blog-title")
            .contains(blog.title)
            .parent(".blog")
            .as("blogDiv")
            .find(".toggleBlogInfo")
            .click();

          for (let i = 0; i < blog.likes; i++) {
            cy.get("@blogDiv").find(".like-button").click();
            cy.wait(100, { log: false });
          }

          cy.get("@blogDiv").should("contain", `likes ${blog.likes}`);
        }
      });

      it("Blogs should be in order of likes", function () {
        cy.reloadFrontend();
        cy.get(".toggleBlogInfo").click({ multiple: true });

        const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes).reverse();

        for (let i = 0; i < sortedBlogs.length; i++) {
          const blog = sortedBlogs[i];
          cy.get(".blog")
            .eq(i)
            .should("contain", blog.title)
            .and("contain.text", `likes ${blog.likes}`);
        }
      });
    });
  });
});
