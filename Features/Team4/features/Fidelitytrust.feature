
Feature: Validate Fidelity Trust Signature Workflow

  Background:
    Given I login to the application with valid credentials    
    When I set the workflow to "fidelitytrust"

  Scenario: Valid Trust Signature creation and file download
    When I navigate to the Planning > Onboarding section
    And I open the advisor dropdown and select "Tony Stark"
    And I click the "Open Account" button
    And I select the workflow for "Young, Tester"
    And I click the Next button
    And I select the "Fidelity IWS" option
    And I click the Next button
    And I proceed to the "Trust" form
    And I click the Next button
    And I fill in the Trust information
    And I fill in the Trustee's personal information
    When I upload the file "sample.pdf" using the label "FirstGovtIDAttachment"
    And I configure Cash Sweep and Asset Movement preferences
    Then I should be able to click "Save & Proceed"
    Then I should be able to download the generated Trust document
    And the downloaded file should be validated successfully

    When validating the PDF generation API invocation using the constructed request body
    Then validate that a valid PDF document is returned in the API response
    Then validate that PDF fields and UI mapping are correct