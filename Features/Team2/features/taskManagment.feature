Feature: Task Management - Admin Workflow

  @regression @P1 @admin
  Scenario: Login and verify Task Workflow section as Admin
    When the user navigates to the Organizations section as "user"
    And I select "navigatetoTaskManagement"
    Then a pop-up window should appear with the option to "AddNewTaskWorkflow"
    #the Task Management screen should display the workflow sections
    And user initiates AddNewTaskWorkflow


  @sanity @P1 @task-management @ticket
  Scenario: Add NewTaskType modal opens and displays fields correctly
    #Given the user navigates to the login page
    When the user navigates to the Organizations section as "user"
    And I select "navigateToTaskManagement"
    And user initiates AddNewTaskWorkflow
    Then I should see the "AddTaskType" modal with required fields visible
    When I cancel the Add Task Type modal

  @sanity @P2
  Scenario: Add Newgroup modal opens and displays fields correctly
    When the user navigates to the Organizations section as "user"
    And I select "navigateToTaskManagement"
    And I click on "AddNewGroup"
    Then I should see the "AddGroup" modal with required fields visible
    When I cancel the Add Group modal

 @smoke
 Scenario: Create Workflow from Scratch
  #When the user navigates to the Organizations section as "admin"
  When the user navigates to the Organizations section as "user"
  And I navigated to "organization" page
  Then I selected "Stark Advisors" Firms
  And I click on the "Task Management" tab
  And I click on the "AddNewTaskWorkflow" button under Task Workflows
  Then a pop-up window should appear with the option to "CreateNewWorkflow"
  When I choose "CreateNewWorkflow"
  And I select the "FromScratch" option in the next prompt
  And I click "Confirm" to continue
  Then a new configuration window should open
  When I fill in the required workflow details: Name, Description, Task steps, Assigned roles or teams
  And I click "Save"
  Then the workflow should be created and saved successfully


Scenario: Create Workflow by Clone
  When the user navigates to the Organizations section as "user"
  And I navigated to "organization" page
  Then I selected "Stark Advisors" Firms
  And I click on the "Task Management" tab
  And I click on the "AddNewTaskWorkflow" button under Task Workflows
  Then a pop-up window should appear with the option to "CreateNewWorkflow"
  When I click on the "Clone" option in the new pop-up window
  And I choose the workflow I want to clone
  And I modify the workflow details as needed
  Then I click "Save"
  Then the workflow should be created and saved successfully


Scenario: Login Admin and Access Task Configuration
  When the user navigates to the Organizations section as "user"
  And I navigate to the organization-level settings page
  And I click on "TaskManagementLeftSide" from the left navigation
  Then I should see screen options like Groups, Types, and Workflows
  When I click "Addnewgroup" to create a group category
  And I click "AddNewTaskType" to define a task type
  Then I click "AddNewTaskWorkflow" to create a workflow


Scenario: Create Group
  When the user navigates to the Organizations section as "user"
  And I select "TaskManagementLeftSide" from the left sidebar menu
  And I click on "Addnewgroup" under the Groups section
  Then a new pop-up window should appear
  When I enter the group name under the Group Information section
  And I choose Group Members, assign an Owner from the dropdown
  Then I click "Save" to create the new group


Scenario: Create Task Type
  When the user navigates to the Organizations section as "user"
  And I select "TaskManagementLeftSide" from the menu options
  And I click on "AddNewTaskType" under Task Type
  Then a new pop-up window should appear
  When I enter the task type name and assign a group
  And I select an appropriate workflow
  Then I click "Save" to complete the task type setup

Scenario: Update Workflow
  When the user navigates to the Organizations section as "user"
  And I open organization-level settings
  And I select "TaskManagementLeftSide" from the left navigation
  Then I should see options like Groups, Types, and Workflows
  When I click "Addnewgroup" to create a group
  And I click "AddNewTaskType" to define a task type
  Then I click "AddNewTaskWorkflow" to update or create a workflow


Scenario: Delete Workflow
  When the user navigates to the Organizations section as "user"
  And I select "navigateToTaskManagement" from the menu
  And I open "Task Workflows" and click "Add Workflow"
  Then I select the workflow I want to delete
  When I click the "Delete" icon
  Then the selected workflow should be removed from the list


Scenario: Create Stage in Workflow
  When the user navigates to the Organizations section as "user"
  And I select "TaskManagementLeftSide" from the left sidebar
  And I open "Task Workflows" and click "Add new workflow"
  Then I open the workflow where a stage is needed
  When I scroll down and click "Add new stage"
  And I fill in all required stage information fields
  Then I click "Save" to complete stage creation

Scenario: Update Stage in Workflow
  Given the user navigates to the login page
  When I navigate to "Organizations" from the side navigation
  And I click on "navigateToTaskManagement"
  And I select "Task Workflows" and click "Add workflow"
  Then I open the workflow where the stage needs updating
  When I scroll down and update the stage information
  And I click "Save"
  Then the updated stage should be saved successfully


Scenario: Delete Group from Task Management
  Given the user navigates to the login page
  When I go to "Organizations" in the navigation menu
  And I select "navigateToTaskManagement"
  And I click on "Groups" in the left menu
  Then I choose the group to delete
  When I click the "Delete" icon
  Then the selected group should be removed from the system


Scenario: Create New Task Type
  Given the user navigates to the login page
  When I go to "Organizations" section from the Admin menu
  And I select "navigateToTaskManagement"
  And I click on "TaskType", then "AddNewTaskType"
  Then I should see a popup modal with the task type details from
  When I enter the task type name and assign a group
  And I click on "Save Task Type"
  Then the new task type should be created successfully

Scenario: Delete New Task Type
  Given the user navigates to the login page
  When I go to "Organizations" section from the Admin menu
  And I select "navigateToTaskManagement"
  And I click on "TaskType"
  Then I select a task type to deletel
  Then I click the "Delete" icon

Scenario: Cancel AddNewTaskType Modal
  Given the user navigates to the login page
  When I navigate to "Organizations" in admin panel
  And I select "navigateToTaskManagement"
  And I click on "AddNewTaskType"
  Then I should see the "Add Task Type" modal with required fields visible
  When I click on the Cancel button in the modal
  Then the modal should close without creating a new task type


Scenario: Cancel Create New Task Type with Adding Files Modal
  Given the user navigates to the login page
  When I go to "Organizations" in the admin panel
  And I select "navigateToTaskManagement"
  And I click on "AddNewTaskType"
  Then I should see the popup for task type creation with file upload option
  When I click on the "File" button and select files
  And I click on the Cancel button instead of saving
  Then the modal should close and no task type should be created


Scenario: Add new Task modal opens and saves task successfully
  Given the user navigates to the Clients section as "user"
  When I go to "Tasks" in the client section
  And I select "navigateToTaskManagement"
  And I click on "AddNewTask"
  Then a pop-up window should appear with the option to "SearchTaskType"
  When I enter a valid Task Type
  And I click on "Confirm"
  Then another pop-up window should appear
  When I fill in "Task Name" and "Description"
  And I click on "Save"
  Then the new task should be created successfully

Scenario: Group Members list displays correctly under Task Management
  Given the user navigates to the Clients section as "user"
  When I select "navigateToTaskManagement"
  And a new window appears
  And I click on "Group Members"
  And I select a Group Member from the dropdown
  Then a pop-up window should appear
  Then I should see the list of members related to the selected Group Member displayed


@delete-stage
Scenario: Delete a stage from a task workflow
  Given the user logs in to Amplify
  When the user navigates to the Admin Organizations section
  And the user clicks on the Task Management tab
  And the user opens the Task Workflow section
  And the user selects a workflow from the list
  Then a new popup window should appear
  When the user navigates to the Stage section
  And the user selects the stage to be deleted
  And the user clicks on the Delete stage icon
  Then the selected stage should be deleted successfully


Scenario: Verify stage creation and pagination functionality
  Given the user logs in to Amplify
  When the user navigates to the Clients
  Then navigates to Tasks section
  And the user clicks on the Task Management tab
  And the user selects a Task Title from the list
  And the user clicks on the "Stage" section inside the Task
  And the user clicks on any created stage
  Then the user should be able to see the stage details
  When the user uses the arrows to navigate stage pagination
  Then the pagination should work correctly and display the appropriate stages


Scenario: Display of "Initialize Tasks" button on clicking the "Task Management" tab
  Given the user logs in to Amplify
  When the user navigates to the Organizations section as "user"
  And navigates to the Hamburger menu
  And the user clicks on the Task Management tab
  Then the user should see a button labeled "Initialize Tasks"


Scenario: "Model Popup" appears on clicking the "Initialization task" button
  Given the user logs in to Amplify
  When the user navigates to the Organizations section as "user"
  And navigates to the Hamburger menu
  And the user clicks on the Task Management tab
  Then a "Model Popup" should appear with the labels "Cancel" and "Continue"



Scenario: Create Group with One Member (Owner)
  When the user navigates to the Organizations section as "user"
  And I navigated to "organization" page
  Then I selected "Stark Advisors" Firms
  And I click on the "Task Management" tab
  And I click on "Addnewgroup" under the Groups section
  Then a new pop-up window should appear
  When I enter the group name under the Group Information section
  And I select one member and assign them as Owner from the dropdown
  Then I click on Add button
  Then a new pop-up window should appear
  Then I click on Ok
  Then I click "Save" to create the new group


Scenario: Create Group with Multiple Members and One Owner
  When the user navigates to the Organizations section as "user"
  And I navigated to "organization" page
  Then I selected "Stark Advisors" Firms
  And I click on the "Task Management" tab
  And I click on "Addnewgroup" under the Groups section
  Then a new pop-up window should appear
  When I enter the group name under the Group Information section
  And I select multiple members and assign one of them as Owner from the dropdown
  Then I click on Add button
  Then a new pop-up window should appear
  Then I click on Ok
  Then I click "Save" to create the new group


Scenario: Create Group with Multiple Members and Multiple Owners
  When the user navigates to the Organizations section as "user"
  And I navigated to "organization" page
  Then I selected "Stark Advisors" Firms
  And I click on the "Task Management" tab
  And I click on "Addnewgroup" under the Groups section
  Then a new pop-up window should appear
  When I enter the group name under the Group Information section
  And I select multiple members and assign multiple owners
  Then I click on Add button
  Then a new pop-up window should appear
  Then I click on Ok
  Then I click "Save" to create the new group


#UI(Admin) - Implement validation for adding Group and Task Type
Scenario: Add Group with valid alphanumeric name up to 50 characters
  When the user navigates to the Organizations section as "user"
  And I select "TaskManagementLeftSide" from the left sidebar menu
  And I click on "Addnewgroup" under the Groups section
  Then a new pop-up window should appear
  When I enter the group name "TeamAlpha2025ValidEntryUpToFiftyCharactersMaxOK"
  And I choose Group Members, assign an Owner from the dropdown
  Then I click "Save" to create the new group
  Then the group should be created successfully without validation error

Scenario: Add Task Type with valid alphanumeric name up to 50 characters
  When the user navigates to the Organizations section as "user"
  And I select "TaskManagementLeftSide" from the menu options
  And I click on "AddNewTaskType" under Task Type
  Then a new pop-up window should appear
  When I enter the task type name "QAReviewRound1TaskTypeForProjectX2025Final"
  And I assign a group
  And I select an appropriate workflow
  Then I click "Save" to complete the task type setup
  Then the task type should be created successfully without error

#UI (Admin)- Group Deletion Errors: Sometimes we get a correct message, and sometimes an error ("Error occurred during the request process").We need the QA team to provide use cases to help resolve this consistently.
Scenario: Delete group with no task type assigned
  Given the user navigates to the login page
  When I go to "Organizations" in the navigation menu
  And I select "navigateToTaskManagement"
  And I click on "Groups" in the left menu
  Then I choose a group not assigned to any task type to delete
  When I click the "Delete" icon
  Then the selected group should be removed from the system
  And the message "Group deleted successfully" should be displayed


#UI - Client Side - Block Moving to Next Stage Until Requirements Have Been Addressed
Scenario: View and verify Task Stages with pagination
  Given the user logs in to Amplify
  When the user navigates to the Clients
  Then navigates to Tasks section
  And clicks on the Task Management tab
  And selects a Task Title from the list
  And clicks on the Stage section inside the Task
  And clicks on any created stage
  Then the stage details should be displayed
  When the user uses pagination arrows
  Then the stage list should update accordingly to reflect the new page of stages


#UI (Client)Stage Requirement Validation: Ensure it is synced with the client-side stage requirement validation in the task popup.
Scenario: Block stage transition if required fields are incomplete
  Given the user logs in to Amplify
  When the user navigates to the Clients
  Then navigates to Tasks section
  And the user clicks on the Task Management tab
  And the user selects a Task Title from the list
  And the user clicks on the "Stage" section inside the Task
  And the user clicks on any created stage
  Then the user should be able to see the stage details
  When the user attempts to move to the next stage without completing all required fields
  Then an alert should appear saying, "All required stage requirements need to be completed before proceeding to a new stage."

Scenario: Validate all required fields are addressed before transition
  Given the user has filled in all mandatory fields (text input, date selection, dropdown, checkbox)
  When the user clicks the button to move to the next stage
  Then the transition should proceed successfully

Scenario: Ensure pagination in stages works correctly
  Given the user is viewing a stage in the "Stage" section
  When the user uses the pagination arrows
  Then the pagination should update the view with the appropriate stages


#UI (Admin)- Delete Operations: Ensure that no new delete request (for Group, Task Type, or Workflow) is triggered until the previous one is completed.
Scenario: Prevent concurrent delete operations for Group
  Given the user navigates to the login page
  When I go to "Organizations" in the navigation menu
  And I select "navigateToTaskManagement"
  And I click on "Groups" in the left menu
  Then I choose a group to delete
  When I click the "Delete" icon
  And the delete request is still processing
  Then the "Delete" icon for any other group should be disabled
  And no new delete operation should be allowed until the first completes

Scenario: Delete Workflow and prevent multiple delete triggers
  When the user navigates to the Organizations section as "user"
  And I select "navigateToTaskManagement" from the menu
  And I open "Task Workflows" and click "Add Workflow"
  Then I select the workflow I want to delete
  When I click the "Delete" icon
  And the workflow delete request is processing
  Then all other delete icons in the workflow list should be disabled
  And no additional delete requests should be triggered

Scenario: Delete Task Type and restrict parallel deletion
  Given the user navigates to the login page
  When I go to "Organizations" section from the Admin menu
  And I select "navigateToTaskManagement"
  And I click on "TaskType"
  Then I select a task type to delete
  When I click the "Delete" icon
  And the delete request is still being processed
  Then the delete icon for other task types should be disabled
  And the UI should prevent triggering another delete action until the current one completes


#UI (Admin)- Task Type List: Add a column to display the reference file count.
Scenario: Display reference file count column in Task Type list
  When the user navigates to the Organizations section as "user"
  And I select "TaskManagementLeftSide" from the menu options
  And I click on "AddNewTaskType" under Task Type
  Then a new pop-up window should appear
  When I enter the task type name and assign a group
  And I select an appropriate workflow
  And I upload 3 reference files to the task type
  Then I click "Save" to complete the task type setup
  And the task type should appear in the task type list
  Then I should see a "File Count" column in the task type list
  And the "File Count" value for the newly created task type should be "3"


#UI (Admin)- Workflow Editing: When updating stage requirements, show the correct validation message: "Workflow is already in use in task types, so you cannot create workflow stage requirements."
Scenario: Show validation message when editing stage requirements for a workflow already in use
  When the user navigates to the Organizations section as "user"
  And I navigated to "organization" page
  Then I selected "Stark Advisors" Firms
  And I click on the "Task Management" tab
  And I click on the "AddNewTaskWorkflow" button under Task Workflows
  Then a pop-up window should appear with the option to "CreateNewWorkflow"
  When I click on the "Clone" option in the new pop-up window
  And I choose the workflow I want to clone
  And I modify the workflow details as needed
  Then I click "Save"
  Then the workflow should be created and saved successfully

  When I navigate to the organization-level settings page
  And I click on "TaskManagementLeftSide" from the left navigation
  And I create a new group by clicking "Addnewgroup"
  And I define a task type by clicking "AddNewTaskType" and assign the cloned workflow
  Then the task type is saved successfully

  When I try to edit the stage requirements in the cloned workflow
  Then a validation message should be displayed as

#UI (Admin)- Stop save/update base 64 in description box
Scenario: Prevent saving base64 content in workflow description when cloning a workflow
  When the user navigates to the Organizations section as "user"
  And I navigated to "organization" page
  Then I selected "Stark Advisors" Firms
  And I click on the "Task Management" tab
  And I click on the "AddNewTaskWorkflow" button under Task Workflows
  Then a pop-up window should appear with the option to "CreateNewWorkflow"
  When I click on the "Clone" option in the new pop-up window
  And I choose the workflow I want to clone
  And I modify the workflow description with base64 encoded content
  Then I click "Save"
  Then the system should prevent saving and show an error message "Base64 format not allowed in description"

Scenario: Prevent saving base64 content in stage description
  Given a workflow is open for editing
  When I add or update a stage with base64 content in its description
  And I click "Save"
  Then the system should reject the input and display "Base64 format not allowed in stage description"

Scenario: Prevent saving base64 content in stage requirement description
  Given a workflow stage is open for configuration
  When I add or update a stage requirement with base64 content in its description
  And I click "Save"
  Then the system should block the update and show a message "Base64 format not allowed in stage requirement description"

