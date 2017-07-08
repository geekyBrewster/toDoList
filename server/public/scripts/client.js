console.log("JS up and Atom!");

$(document).ready(function(){

displayTasks();

// Add click listener to submit button
  $('#submitBtn').on('click', function(){
  // Retrieve entered data & build data object
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
  }); // end of addBtn listener

// Add Delete btn listener
  $('#taskList').on('click', '#deleteBtn', function(){
    var id = $(this).data('id');
      // console.log("Button id: ", id);

    // ajax call to delete task
    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + id,
      success: function(response){
        console.log("Task deleted");
        displayTasks();
      } // end of success
    }); // end of DELETE request
  }); // end of deleteBtn listener

// Add complete btn listener
  $('#taskList').on('click', '#completedBtn', function(){
    var id = $(this).data('id');
      console.log("Button id: ", id);

      // ajax call to update task (PUT reqeust)
      $.ajax({
        type: 'PUT',
        url: '/tasks/' + id,
        success: function(response){
          console.log("Task marked completed");
          var targetTask = '#task' + id;
          $('targetTask').addClass('.completed');
          displayTasks();
        } // end of success
      }); // end of PUT request

  }); // end of btn listener

}); // end of doc.ready

function displayTasks(){
  $('#taskList').empty();
  // ajax call to server to get tasks
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(response){
      console.log('Tasks received from server: ', response);
      var toDos = response.todos;

      for(var i = 0; i < toDos.length; i++){
        var toDo = toDos[i];
        var $el = "";

        // Check completion status and assign correct class
        if(toDo.completed){
          $('#taskList').append('<div class="task completed" id="task' + toDo.id + '"></div>');
          $el = $('#taskList').children().last();
          $el.append('<span>' + toDo.task + '</span>');
          $el.append('<button class="btn" id="deleteBtn" data-id="' + toDo.id + '">Delete</button>');
        } else {
          $('#taskList').append('<div class="task" id="task' + toDo.id + '"></div>');
          $el = $('#taskList').children().last();
          $el.append('<span>' + toDo.task + '</span>');
          $el.append('<button class="btn" id="completedBtn" data-id="' + toDo.id +'">Completed</button>');
          $el.append('<button class="btn" id="deleteBtn" data-id="' + toDo.id + '">Delete</button>');
        }
      } // end of for loop
    } // end of success
  }); // end GET request
} // end of function
