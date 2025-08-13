Feature: Client Full Detail API
  As a tester
  I want to call the Client Full Detail endpoint
  So that I can verify the API returns expected client details

  Scenario: Retrieve full client detail successfully
    When I send a GET request to "/client/<clientID>/full-detail"
      | clientID                             |
      | 5dd2ce6c-8f17-453f-abc3-ad40209fa3c3 |
    Then the response status should be 200
    And the response body should contain "data"
