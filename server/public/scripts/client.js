console.log("JS up and Atom!");

$(document).ready(function(){

// display tasks
displayTasks();

// Retrieve entered data & build data object






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
