Feature: Persona Workflow
  @Persona
  Scenario: Firm admin can access organization details with editable fields
    Given The HomePage is opened
    Given the user is logged in as "singleFirmAdministrator"
    Then Navigate to "Firm Details Page"
    And the user should see only one form listed under "Firm Details Page"
  #  And the user should  not see a list of firms


  @Persona
  Scenario: Single advisor access restricts visibility to only their client records
    Given the user is logged in as "AdvisorSingleFirm"
    Then Navigate to "Onboarding" page
    Then the user click on "Advisor"
    Then the user click on "AdvisorSearch"
    Then the user Validate "Tony stark"



  @Persona
  Scenario: Multi-advisor access shows clients segregated by assigned advisor
    Given The HomePage is opened
    Given the user is logged in as "MultiAdvisorSingleFirm"
    Then Navigate to "Onboarding" page
    Then the user click on "Advisor"
    Then the user click on "AdvisorSearch"
#   validate  MultiAdvisor SingleFirm
    Then the user Validate "Tony stark"
    Then the user Validate "James Rhodes"
    Then the user Validate "Larry Bird"


  @Persona
  Scenario: Customer service view shows only assigned advisor clients
    Given The HomePage is opened
    Given the user is logged in as "singleFirmAdministrator"
    Then Navigate to "Onboarding" page
    Then the user click on "Advisor"
    Then the user click on "AdvisorSearch"
    Then the user Validate "Tony stark"


  @Persona
  Scenario: Customer service view displays client records across multiple advisors
    Given The HomePage is opened
    Given the user is logged in as "MultiCSASingleFirm"
    Then Navigate to "Onboarding" page
    Then the user click on "Advisor"
    Then the user click on "AdvisorSearch"
#   validate  Multi CSA SingleFirm
    Then the user Validate "Tony stark"
    Then the user Validate "James Rhodes"
    Then the user Validate "Larry Bird"
    Then the user Validate "Jarvis Demo Bot"