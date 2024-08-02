describe("Collaborations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")
  
    cy.request("POST", "http://localhost:3000/api/testing/reset")
    cy.request("POST", "http://localhost:3000/api/testing/admin")
  })

  it("User can see colaborations section", () => {
    cy.get("span").should("contain", "Colaboraciones")
  })

  describe("When admin exists", () => {
    beforeEach(() => {
      cy.get("span").contains("Iniciar Sesión").click()
      cy.login("admin@gmail.com", "adminpassword")
    })

    it("Admin can add an image to collaborations", () => {
      cy.addCollab("Cypress Collab", "./cypress_logo.jpg")

      cy.contains("p", "Cypress Collab").should("be.visible")
    })

    it("Admin can add an imagen and then delete it", () => {
      cy.addCollab("Cypress Collab Test", "./cypress_logo.jpg")
      cy.contains("p", "Cypress Collab Test").should("be.visible")

      cy.get("p").contains("Cypress Collab Test").click()

      cy.get('[data-testid="remove-button"]').click()
      cy.get('div[data-status="success"]').should("contain", "Los datos de la colaboración se han eliminado con éxito.")
    })
  })

  describe("User can see an existing collaboration", () => {
    beforeEach(() => {
      cy.get("span").contains("Iniciar Sesión").click()
      cy.login("admin@gmail.com", "adminpassword")
      cy.addCollab("Cypress Collab Test", "./cypress_logo.jpg")

      cy.contains("p", "Cypress Collab Test").should("be.visible")
      cy.get("span").contains("admintest").click()
      cy.get("button").contains("Cerrar Sesión").click()
    })

    it("User not logged in can see collaboration", () => {
      cy.get("span").should("contain", "Colaboraciones")
      cy.get("p").should("contain", "Cypress Collab Test")
    })
  })
})