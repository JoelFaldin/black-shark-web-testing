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

      it("Admin can create a new service and then delete it", () => {
        cy.get('button[aria-label="Close"').click()

        cy.get('button[name="new-service-button"]').click()

        cy.get('input[name="serviceName"]').type("Service test")
        cy.get('input[name="price"]').type(20000)
        cy.get('textarea[name="description"]').type("Service from Cypress!")
        cy.get('input[type="file"]').attachFile("./cypress_logo.jpg")

        cy.get('button[name="button-save-service"]').click()
        
        cy.contains("Servicio creado!")

        cy.get("div").contains("Service test").click()
        cy.get("button").contains("Eliminar").click()

        cy.contains("Servicio eliminado correctamente!")
      })
    })

  })
})