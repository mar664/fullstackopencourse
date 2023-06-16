// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("resetDB", () => {
  cy.request("POST", `${Cypress.env("base_backend_url")}/testing/reset`);
});
Cypress.Commands.add("createUser", ({ username, password, name }) => {
  cy.request("POST", `${Cypress.env("base_backend_url")}/users`, {
    username,
    password,
    name,
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("base_backend_url")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
    cy.visit(Cypress.env("base_frontend_url"));
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  const token = JSON.parse(localStorage.getItem("loggedBlogappUser")).token;
  cy.request({
    method: "POST",
    url: `${Cypress.env("base_backend_url")}/blogs`,
    body: { title, author, url },
    headers: { Authorization: `Bearer ${token}` },
  });
});

Cypress.Commands.add("reloadFrontend", () => {
  cy.visit(Cypress.env("base_frontend_url"));
});
