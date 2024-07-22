describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login")
  })

  it("Login page displays basic buttons", () => {
    cy.get("form").should("be.visible")
    cy.contains("Iniciar Sesión")

    cy.get('input[name="email"]').should("be.visible")
    cy.get('input[name="password"]').should("be.visible")
    cy.get("button").should("contain", "Ingresar")
  })
})