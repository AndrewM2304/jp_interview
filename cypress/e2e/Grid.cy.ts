describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("loads data to display in a grid, and refreshes the data on button press", () => {
    let priceValue;
    cy.get("[data-testid='grid-wrapper']").should("exist");
    cy.get(".ag-row-first > [col-id='price']")
      .invoke("text")
      .then((price) => {
        priceValue = price;

        cy.get("button").contains("Refresh").click();
        cy.get("[data-testid='loading']").should("exist");

        cy.wait(3000);
        cy.get(".ag-row-first > [col-id='price']")
          .invoke("text")
          .then((newPrice) => {
            expect(newPrice).not.to.eq(priceValue);
          });
      });
  });

  it("displays error messages from server", () => {
    cy.interceptRequest("serverMessage");
    cy.get("[data-testid='error']")
      .should("exist")
      .should("contain.text", "Someone unplugged the back end");
  });

  it("catches error if the endpoint is down", () => {
    cy.interceptRequest("error");
    cy.get("[data-testid='error']")
      .should("exist")
      .should("contain.text", "Failed to fetch");
  });
});
