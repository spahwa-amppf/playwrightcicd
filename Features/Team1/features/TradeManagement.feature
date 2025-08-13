Feature: Navigate to Trade Management in Organizations


  @Trade
  Scenario: Trade Management > Staged section
    Given The HomePage is opened
   Given the user is logged in as "admin"
#    Given the user navigates to the login page
    Then the user navigates to "Trade Management"
    Then the user click on "Staged" from the left navigation
    Then the user should see "StagedTrades" section header

  @Trade @smoke
  Scenario: Trade Management > Staged section > Validate table structure and headers
    Given The HomePage is opened
    Given the user is logged in as "admin"
    Then the user navigates to "Trade Management"
    Then the user click on "Management" from the left navigation
    Then the user should see "ManagementIcon" section header
    Then the user click on "Staged" from the left navigation
    Then the user click on "Approvals" from the left navigation
    Then the user click on "Rejected" from the left navigation
    Then the user click on "In Progress" from the left navigation
    Then the user click on "Complete" from the left navigation
    Then the user click on "Order Requests" from the left navigation
    Then the user click on "Settings" from the left navigation
    Then the user click on "Post-Trade" from the left navigation



  Scenario: Trade Management > Staged section > Validate search fields and sort icons
    When the user navigates to the Organizations section as "user"
    Then the user navigates to Investing
    Then the user initiates Trade Management
    Then the user click on Staged from the left navigation
    Then each column in the table should have a search input below the header
    And each sortable column should have a sort icon next to the header name


  Scenario: Trade Management > Trade Approval Section
    When the user navigates to the Organizations section as "user"
    Then the user navigates to Investing
    Then the user initiates Trade Management
    Then the user click on Approved from the left navigation
    Then the user should see "Trade Approvals" section header
    And the trade approvals table should be visible

  Scenario: Trade Management > Trade Approval section > Validate column headers
    When the user navigates to the Organizations section as "user"
    Then the user navigates to Investing
    Then the user initiates Trade Management
    Then the user click on Approval from the left navigation
    Then the table should contain the following column headers:
      | Account         |
      | Account Name    |
      | Symbol          |
      | Symbol Type     |
      | Quantity        |
      | Order Type      |
      | Status          |
      | Executed Shares |
      | Executed Price  |
      | Executed Value  |
      | Sent By         |
      | Sent Date       |

  Scenario: Trade Management > Trade Approval section > Validate search and sort icons
    When the user navigates to the Organizations section as "user"
    Then the user navigates to Investing
    Then the user initiates Trade Management
    Then the user click on Approved from the left navigation
    Then each column in the trade approvals table should have a search field
    And sortable columns should have sort icons beside the header text

  @Trade
  Scenario: Trade Management > Rejected Section
    Given The HomePage is opened
    Given the user is logged in as "admin"
    Then the user navigates to "Trade Management"
    Then the user click on "Staged" from the left navigation
    Then the user should see "Rejected" section header



  Scenario: Trade Management > Rejected Section – Scroll and View All Records
    When the user navigates to the Organizations section as "user"
    Then the user navigates to Investing
    Then the user initiates Trade Management
    Then the user clicks on Rejected from the left navigation
    Then the user scrolls to the bottom of the table
    Then all rejected trade records should be visible


  Scenario: Trade Management > In Progress Section
    When the user navigates to the Organizations section as "user"
    Then the user navigates to Investing
    Then the user initiates Trade Management
    Then the user click on In Progress from the left navigation
    Then the Staged tab should be highlighted
    And the following column headers should be visible in the table
      | Account         |
      | Account Name    |
      | Symbol          |
      | Symbol Type     |
      | Quantity        |
      | Order Type      |
      | Status          |
      | Executed Shares |
      | Executed Price  |
      | Executed Value  |
      | Sent By         |
      | Sent Date       |
    And the "Send Selected" button should be visible
    And the order filter dropdown should be present and defaulted to "My Orders"

  Scenario: Trade Management > In Progress Section - Status & Date Columns
    When the user navigates to the Organizations section as "user"
    Then the user navigates to Investing
    Then the user initiates Trade Management
    Then the user clicks on Approved from the left navigation
    Then the Trade Approvals tab should be highlighted
    And the following column headers should be visible in the table
      | Account         |
      | Account Name    |
      | Symbol          |
      | Symbol Type     |
      | Quantity        |
      | Order Type      |
      | Status          |
      | Executed Shares |
      | Executed Price  |
      | Executed Value  |
      | Sent By         |
      | Sent Date       |

  @Trade
  Scenario: Trade Management > Complete Section
    Given The HomePage is opened
    Given the user is logged in as "admin"
    Then the user navigates to "Trade Management"
    Then the user click on "Staged" from the left navigation
    Then the user click on "Complete" from the left navigation


  Scenario: Verify Rebalancer, Swap cards and account table data
    Given the user is logged in and navigates to the Trade Dashboard
    Then the Rebalancer card with count should be visible
    And the Swap card should be visible
    And the account data table should be loaded
    And each row in the table should contain account name, balance, household, and tradable icon
    And the "View" button should be visible for each row
