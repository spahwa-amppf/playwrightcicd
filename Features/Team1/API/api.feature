Feature: Verify API Functionality

  @trade
  Scenario: Validate Trade Management Endpoints for a specific topic is successfully returning successful status code
    Given I have a valid bearer token
    When I call the Trade Management endpoint with topic "Trade"
    Then I get a successful response