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
    cy.login("testing@gmail.com", "thetestingpassword")

    cy.get('div[data-status="success"]').should("contain", "Usuario verificado con exito. Redirigiendo...")
  })

  it("User cant log in with incorrect credentials", () => {
    cy.login("testing@gmail.com", "wrong password")

    cy.get('div[data-status="error"]').should("contain", "Contraseña incorrecta.")
  })

  it("User can't log in with an email that doesn't exists", () => {
    cy.login("nonexisting@gmail.com", "randompassword")

    cy.get('div[data-status="error"]').should("contain", "Usuario no encontrado.")
  })

  it("User can't log in without an email", () => {
    cy.get("button").contains("Ingresar").click()

    cy.get('div[data-status="error"]').should("contain", "Debes ingresar un correo.")
  })

  it("User can't log in without a password", () => {
    cy.get('input[name="email"]').type("admin@gmail.com")
    cy.get("button").contains("Ingresar").click()

    cy.get('div[data-status="error"]').should("contain", "Ingresa una contraseña!")
  })
})