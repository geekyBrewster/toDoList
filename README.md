# Weekend challenge 3: To Do List
Create a full stack app from scratch

Basic
-------
- Create a UI that allows the user to create a task
  - [x] Create a text input field & submit button
  - [x] Create an area where task will be displayed
  - [x] Create two CSS styles for tasks: uncompleted & completed
- Create local database using Postico
  - [x] Create & save databaseSetup.sql file w/ project files
  - [x] Database should include: id, task, completion status
  - [x] Add a few sample tasks for testing
- Display existing tasks on the DOM (GET request)
  - [x] Request tasks from server
  - [x] Send tasks from DB to client
  - [x] Append existing tasks to the DOM
- Upon submitting a task:
  - [x] Retrieve entered data & build data object
  - [x] Send data to the server
  - [x] Add task to the database w/ POST request
  - [x] Each task should have a complete & delete button
- When a task is completed, change its visual representation
  - [x] Add click listener to complete button
  - [x] Change task's class on click
  - [x] Update task's completion status in DB
  - [ ] Add toggle complete/uncompleted to button
- Deleting a task should remove it from both front end and DB
  - [x] Add click listener to delete button
  - [x] Remove task from the DOM
  - [x] Delete the task from the DB
- [x] Add appealing CSS to the UI

Hard
-------
- [x] Add an "Are you sure?" option when deleting a task
- [ ] Animate appearance of delete button
- [x] Replace completed button w/ checkbox icon

Pro
------
- [ ] Adjust logic so that the completed tasks are brought to the bottom of the page
