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

      it("Admin can delete a service", () => {
        cy.createService("Service test", 20000, "Service from Cypress!", "./cypress_logo.jpg")

        cy.deleteService("Service test")
      })

      it("Admin can filter services", () => {
        cy.createService("React test", 10000, "React service from Cypress!", "./react_logo.png")
        cy.createService("Node test", 15000, "Node service from Cypress!", "./node_logo.png")

        cy.get('input[name="input-service-filter"]').type("Node")

        cy.contains("Node test")
        cy.contains("React service from Cypress!").should("not.exist")
      })

      it.only("Admin can update a service's data", () => {
        cy.createService("Service Test", 20000, "Service from Cypress!", "./cypress_logo.jpg")

        cy.get("div").contains("Service Test").click()
        cy.get("button").contains("Editar").click()

        cy.get('input[name="nombre"]').clear().type("Cypress service from Cypress!")
        cy.get('input[name="precio"]').clear().type(5000)
        cy.get("button").contains("Guardar Cambios").click()

        cy.contains("Cypress service from Cypress!")
      })
    })

  })
})