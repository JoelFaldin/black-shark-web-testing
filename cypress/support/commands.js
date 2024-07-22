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
import 'cypress-file-upload'

Cypress.Commands.add("createService", (name, price, desc, filePath) => {
  cy.get('button[aria-label="Close"').click()

  cy.get('button[name="new-service-button"]').click()

  cy.get('input[name="serviceName"]').type(name)
  cy.get('input[name="price"]').type(price)
  cy.get('textarea[name="description"]').type(desc)
  cy.get('input[type="file"]').attachFile(filePath)

  cy.get('button[name="button-save-service"]').click()
  
  cy.contains("Servicio creado!")
})

Cypress.Commands.add('deleteService', (serviceName) => {
  cy.get("div").contains(serviceName).click()
  cy.get("button").contains("Eliminar").click()
  
  cy.contains("Servicio eliminado correctamente!")
})