Feature: Verify API Functionality

  @organization
  Scenario: Fetch organization and query task types for each | Integration Test – Organization → ServiceTaskType
    Given I have a valid bearer token
    When I get all organizations
    Then I query ServiceTaskTypes for each and validate response
