console.log("JS up and Atom!");

$(document).ready(function(){

displayTodos();

// ADD NEW TODO -- SUBMIT BUTTON
  $('#submitBtn').on('click', function(){
    addTodo();
  }); // end of addBtn listener

// DELETE TODO -- DELETE BUTTON
  $('#taskList').on('click', '#deleteBtn', function(){
    var id = $(this).data('id');
      // console.log("Button id: ", id);
    //Confirm w/ user that they want to delete task
    var answer = confirm("are you sure you want to delete?");
    if(answer){
      deleteTodo(id);
    }
  }); // end of deleteBtn listener

// MARK TODO COMPLETE
  $('#taskList').on('click', '#completedBtn', function(){
    var id = $(this).data('id');
      // console.log("Button id: ", id);
    completeTodo(id);
  }); // end of btn listener

  // UNDO COMPLETE TASK -- UNDO BUTTON
    $('#taskList').on('click', '#undoBtn', function(){
      var id = $(this).data('id');
        // console.log("Button id: ", id);
      unmarkTodo(id);
    }); // end of btn listener

}); // end of doc.ready

function addTodo(){
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
        displayTodos();
      } // end success
    }); // end POST request
}

function deleteTodo(id){
  // ajax call to delete task
  $.ajax({
    type: 'DELETE',
    url: '/todos/' + id,
    success: function(response){
      console.log("Todo deleted");
      displayTodos();
    } // end of success
  }); // end of DELETE request
}

function completeTodo(id){
  // ajax call to update todo (PUT reqeust)
  $.ajax({
    type: 'PUT',
    url: '/todos/completed/' + id,
    success: function(response){
      console.log("Todo marked completed");
      var targetTask = '#task' + id;
      $('targetTask').addClass('.completed');
      displayTodos();
    } // end of success
  }); // end of PUT request
}

function unmarkTodo(id){
  // ajax call to update todo as uncompleted (PUT reqeust)
  $.ajax({
    type: 'PUT',
    url: '/todos/undo/' + id,
    success: function(response){
      console.log("Task marked UNcompleted");
      var targetTask = '#task' + id;
      $('targetTask').removeClass('.completed');
      displayTodos();
    } // end of success
  }); // end of PUT request
}

function displayTodos(){
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
