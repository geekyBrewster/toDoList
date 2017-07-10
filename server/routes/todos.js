var express = require('express');
var router = express.Router();  //Need .Router() to handle this router
var pg = require('pg');

// Database settings
var config = {
  database: 'antares', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time?
  idleTimeoutMillis: 30000 // 30 second time out
};

var pool = new pg.Pool(config);

// Send tasks to client from DB using GET request
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "todos" ORDER BY "completed";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET

//Add task to the database w/ POST request
router.post('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var toDo = req.body;
        // console.log("to do: ", toDo);
      var task = toDo.task;
      var completionStatus = toDo.completed;
      var queryText = 'INSERT INTO "todos" ("task", "completed") ' +
          'VALUES ($1, $2);';
      db.query(queryText,[task, completionStatus], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of POST

// DELETE task from DB
router.delete('/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
        // console.log("button id: ", id);
      var queryText = 'DELETE FROM "todos" WHERE "id"=$1;';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of DELETE

// Mark task completed in DB
router.put('/completed/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
        // console.log("button id: ", id);
      var queryText = 'UPDATE "todos" SET "completed" = \'true\' WHERE "id"=$1;';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT

// UNMARK task completed in DB
router.put('/undo/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
        // console.log("button id: ", id);
      var queryText = 'UPDATE "todos" SET "completed" = \'false\' WHERE "id"=$1;';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT

module.exports = router;
