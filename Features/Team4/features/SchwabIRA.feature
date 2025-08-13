Feature: Validate Contributary IRA workflow and PDF verification

  Background:
    Given I login to the application with valid credentials
    When I set the workflow to "schwabira"

  @smoke
  Scenario Outline: Login and complete Contributary IRA workflow and validate Trust document
    When I navigate to the Planning > Onboarding section
    And I open the advisor dropdown and select "<AdvisorName>"
    And I click the "Open Account" button
    And I select the workflow for "<WorkflowName>"
    And I click the Next button
    And I select the "<Custodian>" option
    And I click the Next button
    And I click the "Contributory IRA" link
    And I click the Next button
    When I select "Contributory IRA" from the account type dropdown
    And I fill in the Account Owners information
    And I select Advise master code "<adviseMasterCode>" from the dropdown
    Then I should be able to click "Save & Proceed"
    Then I should be able to download the generated Trust document
    And the downloaded file should be validated successfully
    Then validate that the ZIP file contains exactly <ExpectedPdfCount> PDF files
    And validate that at least one PDF file name includes "<ExpectedPdfName>"   
    When validating the PDF generation API invocation using the constructed request body
    Then validate that a valid PDF document is returned in the API response
    Then validate that PDF fields and UI mapping are correct
    And validate that the API generated PDF matches the downloaded PDF
      | <FirstName>              |
      | <dob>                    |
      | <phone>                  |
      | <email>                  |
      | <LastName>               |
      | <state>                  |

    Examples:
      | AdvisorName | WorkflowName  | Custodian | FirstName | LastName | ExpectedPdfCount | ExpectedPdfName | dob        | email                    | ssn       | phone     | address     | city      | state | zip   | adviseMasterCode | citizenship | resident | EmploymentStatus |
      | Tony Stark  | Young, Tester | Schwab    | Young     | Tester   | 5                | Contributory IRA    | 01/01/1990 | young.tester@example.com | 123456789 | 123456789 | 123 Main St | Anchorage | AK    | 99501 | 11118888         | USA         | USA       | Retired          |

