# Weekend challenge 3: To Do List
Create a full stack app from scratch

Basic
-------
- [ ] Create a UI that allows the user to create a task
  - [x] Create a text input field & submit button
  - [x] Create an area where task will be displayed
  - [ ] Create two CSS styles for tasks: uncompleted & completed
- [ ] Create local database using Postico
  - [ ] Create & save databaseSetup.sql file w/ project files
  - [ ] Database should include: id, task, completion status
  - [ ] Add a few sample tasks for testing
- [ ] Upon submitting a task:
  - [ ] Retrieve entered data & build data object
  - [ ] Send data to the server
  - [ ] Add task to the database w/ POST request
  - [ ] Each task should have a complete & delete button
- [ ] When a task is completed, change its visual representation
  - [ ] Add click listener to complete button
  - [ ] Change task's class on click
  - [ ] Update task's completion status in DB
- [ ] Deleting a task should remove it from both front end and DB
  - [ ] Add click listener to delete button
  - [ ] Remove task from the DOM
  - [ ] Delete the task from the DB
- [ ] Add appealing CSS to the UI

Hard
-------
- [ ] Add an "Are you sure?" option when deleting a task
- [ ] Add jQuery animation to the appearance / disappearance of tasks

Pro
------
- [ ] Adjust logic so that the completed tasks are brought to the bottom of the page
