var Database = require('./databaseModel');
var _ = require('lodash');
var mysql = require('mysql');

exports.params = function(req, res, next, id) {
  Database.findById(id)
    .populate('user')
    .exec()
    .then(function(database) {
      if (!database) {
        next(new Error('No database with that id'));
      } else {
        req.database = database;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Database.find({ user: req.body.user })
    .populate('user')
    .exec()
    .then(function(databases){
      res.json(databases);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var database = req.database;
  res.json(database);
};

exports.put = function(req, res, next) {
  var database = req.database;

  var update = req.body;

  _.merge(database, update);

  database.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newdatabase = req.body;
   
  Database.create(newdatabase)
    .then(function(database) {

       var con = mysql.createConnection({
        host: req.body.host,
        user: req.body.dbUser,
        password: req.body.dbPwd,
        database: req.body.name
      });
      
      con.connect(function(err) {
        if (err) throw err;
         
      
      });

      res.json({database ,message : 'you are connected'})
    
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.database.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};


exports.getTableAndFields = function(req, res, next) {
   
   
      var Pwd 

                      if (req.body.dbPwd ){
                        Pwd =req.body.dbPwd 
                      }else {
                        Pwd="";
                      }

       var con = mysql.createConnection({
        host: req.body.host,
        user: req.body.dbUser,
        password: Pwd,
        database: req.body.name
      });
      
      con.connect(function(err) {
        if (err) throw err;
         
        con.query("SHOW TABLES", function (err, result,fields) {
          if (err) throw err;
          console.log(result);
          // con.query("SELECT * FROM internship", function (err, result, fields) {
          //   if (err) throw err;
            console.log(fields);
            res.json({message:'you are connected', tables: result })
          // });
        });
      
       
      
        
        


         
      
      });

     
    
    }, function(err) {
      next(err);
     


};





exports.getFields = function(req, res, next) {
   var con = mysql.createConnection({
   host: req.body.host,
   user: req.body.dbUser,
   password: req.body.dbPwd,
   database: req.body.name
 });
 
 con.connect(function(err) {
   if (err) throw err;
    
      con.query(`SHOW COLUMNS  FROM ${req.body.table}`, function (err, result, fields) {
       if (err) throw err;
       console.log(fields);
       res.json({fields: result })
     });
    
 });

}, function(err) {
 next(err);
};
