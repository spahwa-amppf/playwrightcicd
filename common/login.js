import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Step 1: Open the login page
Given("I open the login page", () => {
  cy.visit('https://demo.amplifyplatform.com');
});

// Step 2: Enter username and password
When("I enter username {string} and password {string}", (username, password) => {

            // Enter login credentials and submit
            cy.get('#Email').type('demo_ng'); // Replace with actual input ID
            cy.xpath("//input[@value='Next']").click();
            cy.get('#Password').type('Dem0NexGen!'); // Replace with actual input ID
            cy.xpath("//input[@value='Log In']").click(); // Replace with actual button ID or class


    });
});

// Step 3: Verify that the dashboard is visible
Then("I should see the dashboard", () => {


            cy.xpath("//*[@class=\"topnav-items\"]/amp-top-nav-menuitem/div/a[@title=\"Clients\"]").click();

            //SubItems
            cy.xpath("//*[@class=\"topnav-subitems\"]/amp-top-subnav-item/div/a[@title=\"Clients\"]").click();

            cy.xpath("(//th[@class=\"drag-exclude amp-table-filter\"])[1]//*[@placeholder=\"Search\"]").type("Barton, Clint and Laura{enter}");

            cy.wait(4000)
            //div[@class='name-display-style' and contains(text(), 'Barton, Clint and Laura')]
            // Assert that a specific label exists post-login
            cy.xpath("//div[@class='name-display-style']") // Replace with actual class or selector
                .should('be.visible')
                .invoke('removeAttr', 'target') // Removes the target attribute to prevent opening in a new tab
                .click(); // Opens in the same tab


});

// Step 4: Verify API Response
Then("the API response should return status 200 with correct user data", () => {
   const requestBody = {
                  filters: {
                      status: 'CLI001'
                  },
                  sort: 'name',
                  pageNum: 1,
                  itemLimit: 20,
                  enableCaching: true
              };

              postData('https://demo.amplifyplatform.com/api/client/search-paged', requestBody).then((response) => {
                  expect(response.status).to.eq(200);
                  // Extract the specific name from the response
                  const result = response.body.data.items.find(item => item.name);

                  if (result) {
                      // Make the result available as an alias
                      cy.wrap(result).as('extractedName');

                      // Use cy.get() to access the wrapped result instead of cy.wait()
                      cy.get('@extractedName').then((extractedName) => {
                          expect(extractedName).to.have.property('name');
                      });
                  }

                  // Function to search and validate results
                  const searchAndValidate = (searchName) => {
                      cy.xpath('(//th[@class="drag-exclude amp-table-filter"])[1]//*[@placeholder="Search"]')
                          .clear()
                          .type(`${searchName}{enter}`);

                      // Validate that the search results match the expected name
                      cy.get('.result-item') // Replace with actual selector for search result item
                          .should('have.length.at.least', 1)
                          .each(($el) => {
                              cy.wrap($el).should('contain.text', searchName);
                          });
                  };

              });

              getData('https://demo.amplifyplatform.com/api/client/contact/0a30fd97-df15-4997-a831-60f50f7e5487', requestBody).then((response) => {
                  expect(response.status).to.eq(200);
                  expect(response.body.data).to.have.property('firstName').contain('Sarvs');
                  expect(response.body.data).to.have.property('lastName').contain('Balboa')
                  expect(response.body.data).to.have.property('nickname').contain('Sravs');
              })
});

// Step 5: Verify Database Response
Then("the database should contain user {string} with valid session details", (username) => {

             cy.getCreatedDates().then((results) => {
                 expect(results).to.be.an('array').that.is.not.empty;
                 results.forEach((row) => {
                     expect(row).to.have.property('CreatedDate');
                     cy.log(`CreatedDate: ${row.CreatedDate}`);
                     if (row) {
                         Cypress.env('createdDate', row.CreatedDate); // ✅ Store value in Cypress environment
                         Cypress.env('householdName', row.HouseholdName);
                       }
                       cy.log("createdDate::" + Cypress.env('createdDate') )
                 });
             });



             const query = `SELECT TOP (1) * FROM [dbo].[CRM_Household]`;
             cy.executeQuery(query).then((results) => {
                 expect(results).to.be.an('array');
                 if (results.length > 0) {
                     results.forEach((row) => {
                         expect(row).to.have.property('HouseholdName');
                         expect(row).to.have.property('CreatedDate');
                     });
                 }
             });


});
