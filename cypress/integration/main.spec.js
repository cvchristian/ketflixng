// If it doesn't work try to uncomment the waits, they dont work all the time
it("It loads the film list and check the first ID", () => {
  cy.server()
  cy.visit("http://localhost:4200");
  cy.get("button").contains("Films List");
  cy.route("http://www.mocky.io/v2/5c732d73330000771676025f").as("films");
  cy.get(':nth-child(3) > button').click();
  //cy.wait("@films");
  cy.get("tbody > :nth-child(1) > :nth-child(1)").contains("1");
});


it("Search table is working", () => {
  cy.get('.id > ng2-smart-table-filter > .ng2-smart-filter > default-table-filter > input-filter > .form-control').type('2')
  cy.get('tbody > tr > :nth-child(1)').contains("2");
  cy.get('.id > ng2-smart-table-filter > .ng2-smart-filter > default-table-filter > input-filter > .form-control').clear();
  cy.get('.title > ng2-smart-table-filter > .ng2-smart-filter > default-table-filter > input-filter > .form-control').type('deadpool 3')
  cy.get('tbody > tr > :nth-child(2)').contains("Deadpool 3")
  cy.get('.title > ng2-smart-table-filter > .ng2-smart-filter > default-table-filter > input-filter > .form-control').clear()
});


it("It loads a film info", () => {
  cy.server()
  cy.visit("http://localhost:4200");
  cy.get(':nth-child(3) > button').contains("Films List");
  cy.route("http://www.mocky.io/v2/5c732d73330000771676025f").as("films");
  cy.get(':nth-child(3) > button').click();
  //cy.wait("@films");
  cy.get('tbody > :nth-child(1) > :nth-child(1)').click()
  cy.get('input[ng-reflect-model="1"]')
  cy.get('input[ng-reflect-model="Deadpool"]').type('. yep is working.')

});


it("It goes back", () => {
  cy.server()
  cy.route("http://www.mocky.io/v2/5c732d73330000771676025f").as("films");
  cy.get(':nth-child(3) > button').click()
  //cy.wait("@films");
});
