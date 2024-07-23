describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login")

    cy.request("POST", "http://localhost:3000/api/testing/reset")

    const newUser = {
      username: "tester user",
      password: "thetestingpassword",
      email: "testing@gmail.com"
    }

    cy.request("POST", "http://localhost:3000/api/testing/user", newUser)
  })

  it("Login page displays basic buttons", () => {
    cy.get("form").should("be.visible")
    cy.contains("Iniciar Sesión")

    cy.get('input[name="email"]').should("be.visible")
    cy.get('input[name="password"]').should("be.visible")
    cy.get("button").should("contain", "Ingresar")
  })

  it("User can log in with correct credentials", () => {
    cy.get('input[name="email"]').type("testing@gmail.com")
    cy.get('input[name="password"]').type("thetestingpassword")
    cy.get("button").click()

    cy.get('div[data-status="success"]').should("contain", "Usuario verificado con exito. Redirigiendo...")
  })

  it("User cant log in with incorrect credentials", () => {
    cy.get('input[name="email"]').type("testing@gmail.com")
    cy.get('input[name="password"]').type("wrong passwprd")
    cy.get("button").click()

    cy.get('div[data-status="error"]').should("contain", "Contraseña incorrecta.")
  })

  it("User can't log in with an email that doesn't exists", () => {
    cy.get('input[name="email"]').type("nonexisting@gmail.com")
    cy.get('input[name="password"]').type("randompassword")
    cy.get("button").contains("Ingresar").click()

    cy.get('div[data-status="error"]').should("contain", "Usuario no encontrado.")
  })
})