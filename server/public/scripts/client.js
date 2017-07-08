console.log("JS up and Atom!");

$(document).ready(function(){

displayTasks();

// Retrieve entered data & build data object
  // Add click listener to submit button
  $('#submitBtn').on('click', function(){
    var task = $('#taskText').val();
      // console.log("Task entered: ", task);
    var toDo = {task: task, completed: false};
      // console.log("toDo being sent: ", toDo);

    // send data to server via POST
    $.ajax({
      type: 'POST',
      url: '/tasks',
      data: toDo,
      success: function(response){
        console.log("Received from server: ", response);
        displayTasks();
      } // end success
    }); // end POST request
  });





// Send data to the server



}); // end of doc.ready

function displayTasks(){
  $('#taskList').empty();
  // ajax call to server to get tasks
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(response){
      console.log('Tasks received from server: ', response);
      var toDo = response.todos;

      for(var i = 0; i < toDo.length; i++){
        var id = toDo[i].id;
        var task = toDo[i].task;
        var completionStatus = toDo[i].completed;
        var $el = "";

        // Check completion status and assign correct class
        if(completionStatus){
          $('#taskList').append('<div class="task completed" data-id="' + id + '"></div>');
          $el = $('#taskList').children().last();
          $el.append('<span>' + task + '</span>');
          $el.append('<button class="btn" id="delete">Delete</button>');
        } else {
          $('#taskList').append('<div class="task" data-id="' + id + '"></div>');
          $el = $('#taskList').children().last();
          $el.append('<span>' + task + '</span>');
          $el.append('<button class="btn" id="completed">Finished</button>');
          $el.append('<button class="btn" id="delete">Delete</button>');
        }
      } // end of for loop
    } // end of success
  }); // end GET request
}
