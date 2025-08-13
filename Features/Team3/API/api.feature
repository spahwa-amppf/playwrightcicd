Feature: Research API - POST call for BI hierarchy
  As a tester
  I want to call the Research endpoint with POST
  So that I can verify the BI hierarchy data is returned correctly

  Scenario: Retrieve BI hierarchy for a specific topic
    When I call the Research endpoint POST call "advisor"
    Then the response status should be 200
    And the response should contain valid advisor section data
