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
  })
})