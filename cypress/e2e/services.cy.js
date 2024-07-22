describe("Services", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")

    cy.request("POST", "http://localhost:3000/api/testing/reset")
  })

  it("User can go to services page", () => {
    cy.get("span").contains("Servicios").click()

    cy.contains("Filtrar servicios...")
  })

  describe("When admin user exists", () => {
    beforeEach(() => {
      cy.request("POST", "http://localhost:3000/api/testing/admin")
    })

    it("User can log in with admin credentials", () => {
      cy.visit("http://localhost:5173/login")
    
      cy.get('input[name="email"').type("admin@gmail.com")
      cy.get('input[name="password"').type("adminpassword")
      cy.get("button").contains("Ingresar").click()

      cy.contains("Usuario verificado con exito. Redirigiendo...")
    })

    describe("And admin user is logged in", () => {
      beforeEach(() => {
        cy.visit("http://localhost:5173/login")

        cy.get('input[name="email"').type("admin@gmail.com")
        cy.get('input[name="password"').type("adminpassword")
        cy.get("button").contains("Ingresar").click()

        cy.get("span").contains("Servicios").click()
      })

      it("Admin can create a new service", () => {
        cy.createService("Service test", 20000, "Service from Cypress!", "./cypress_logo.jpg")
      })

      it.only("User can delete a service", () => {
        cy.createService("Service test", 20000, "Service from Cypress!", "./cypress_logo.jpg")

        cy.deleteService("Service test")
      })
    })

  })
})