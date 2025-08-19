Feature: Research Workflow
  @smoke
  Scenario: Admin left panel views the Research section
    Given The HomePage is opened
    And the user is logged in as "admin"
    Then the user navigate to "Research"
    And the "Dashboard" tab is selected in the sidebar
    And the "Market" tab is visible in the sidebar
    And the "Watchlists" tab is visible in the sidebar
    And the "Marquee" tab is visible in the sidebar
    And the "Filter" tab is visible in the sidebar


  Scenario: Admin views the Research dashboard
    Given The HomePage is opened
    And the user is logged in as "admin"
    Then the user navigates to "Research"
    And the "Asset Under Management" widget is visible
    And the "Book Metrics" widget is visible
    And the "Book Characteristics" section is displayed with risk metrics
    And the "Book Composition" panel shows allocation breakdowns
    And the "Notifications" panel is present with News and Events tabs


  Scenario: Filter views > Research dashboard
    Given The HomePage is opened
    And the user is logged in as "admin"
    Then the user navigates to "Research"
    When the user clicks on the "Filter" option in the left navigation panel
    Then the Filter popup should appear
    And the Filter popup should show the following sections:
      | Advisors   |
      | Households |
      | Accounts   |

    And the user should see the list of Advisors
    And the user selects an Advisor
    Then the user should see related Households
    And the user should see related Accounts
    When the user clicks on the "Apply Filter" button
    Then the Watchlists section should refresh and display data based on the applied filter


  Scenario: Admin toggles the Watchlist layout view

    Given The HomePage is opened
    And the user is logged in as "admin"
    And the user navigates to the "Research" section
    And the Watchlists page is displayed in default view
    When the user clicks on the "Toggle View" icon in the top-right corner
    Then the watchlist layout should switch to the alternate view
    And the layout should retain all watchlists with their respective data
