console.log("JS up and Atom!");

$(document).ready(function(){

displayTasks();

// ADD TASK -- SUBMIT BUTTON
  $('#submitBtn').on('click', function(){
  // Retrieve entered data & build data object
    var task = $('#taskText').val();
      // console.log("Task entered: ", task);
    var toDo = {task: task, completed: false};
      // console.log("toDo being sent: ", toDo);

  // send data to server via POST
    $.ajax({
      type: 'POST',
      url: '/todos',
      data: toDo,
      success: function(response){
        console.log("Received from server: ", response);
        displayTasks();
      } // end success
    }); // end POST request
  }); // end of addBtn listener

// DELETE TASK -- DELETE BUTTON
  $('#taskList').on('click', '#deleteBtn', function(){
    var id = $(this).data('id');
      // console.log("Button id: ", id);

    // ajax call to delete task
    $.ajax({
      type: 'DELETE',
      url: '/todos/' + id,
      success: function(response){
        console.log("Task deleted");
        displayTasks();
      } // end of success
    }); // end of DELETE request
  }); // end of deleteBtn listener

// COMPLETE TASK -- CHECKMARK BUTTON
  $('#taskList').on('click', '#completedBtn', function(){
    var id = $(this).data('id');
      console.log("Button id: ", id);

      // ajax call to update todo (PUT reqeust)
      $.ajax({
        type: 'PUT',
        url: '/todos/completed/' + id,
        success: function(response){
          console.log("Task marked completed");
          var targetTask = '#task' + id;
          $('targetTask').addClass('.completed');
          displayTasks();
        } // end of success
      }); // end of PUT request
  }); // end of btn listener

  // UNDO COMPLETE TASK -- UNDO BUTTON
    $('#taskList').on('click', '#undoBtn', function(){
      var id = $(this).data('id');
        console.log("Button id: ", id);

        // ajax call to update todo (PUT reqeust)
        $.ajax({
          type: 'PUT',
          url: '/todos/undo/' + id,
          success: function(response){
            console.log("Task marked UNcompleted");
            var targetTask = '#task' + id;
            $('targetTask').removeClass('.completed');
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
    url: '/todos',
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
          $el.append('<button class="btn" id="undoBtn" data-id="' + toDo.id +'"><i class="fa fa-undo fa-2x" aria-hidden="true"></i></button>');
          $el.append('<button class="btn" id="deleteBtn" data-id="' + toDo.id + '"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></button>');
        } else {
          $('#taskList').append('<div class="task" id="task' + toDo.id + '"></div>');
          $el = $('#taskList').children().last();
          $el.append('<span>' + toDo.task + '</span>');
          $el.append('<button class="btn" id="completedBtn" data-id="' + toDo.id +'"><i class="fa fa-check-square fa-2x" aria-hidden="true"></i></button>');
          $el.append('<button class="btn" id="deleteBtn" data-id="' + toDo.id + '"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></button>');
        }
      } // end of for loop
    } // end of success
  }); // end GET request
} // end of function
