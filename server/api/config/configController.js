var Config = require('././configModel');
var _ = require('lodash');
 
 
var mysql = require('mysql');

exports.params = function(req, res, next, id) {
  Config.findById(id)
    .populate('database')
    .exec()
    .then(function(config) {
      if (!config) {
        next(new Error('No config with that id'));
      } else {
        req.config = config;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Config.find({database : req.body.database})
    .populate('database')
    .exec()
    .then(function(configs){
      res.json(configs);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var config = req.config;
  res.json(config);
};

exports.put = function(req, res, next) {
  var config = req.config;

  var update = req.body;

  _.merge(config, update);

  config.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newpost = req.body;

  Config.create(newpost)
    .then(function(config) {
      res.json(config);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.config.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};


exports.avg = function(req, res, next) {
  
  var con = mysql.createConnection({
    host: req.body.host,
    user: req.body.dbUser,
    password: req.body.dbPwd,
    database: req.body.name
  });
  
  con.connect(function(err) {
    if (err) throw err;
     
    con.query(`SELECT ${req.body.fieldOne}, AVG(${req.body.fieldTow})  FROM ${req.body.tableName} GROUP BY ${req.body.fieldOne} `, function (err, result,fields) {
      if (err) throw err;
      console.log(result);
  
        res.json({statistic: result })
      // });
    });
  });
}, function(err) {
next(err);
};

exports.sum = function(req, res, next) {
  
  var con = mysql.createConnection({
    host: req.body.host,
    user: req.body.dbUser,
    password: req.body.dbPwd,
    database: req.body.name
  });
  
  con.connect(function(err) {
    if (err) throw err;
     
    con.query(`SELECT ${req.body.fieldOne}, SUM(${req.body.fieldTow})  FROM ${req.body.tableName} GROUP BY ${req.body.fieldOne} `, function (err, result,fields) {
      if (err) throw err;
      console.log(result);
      // con.query("SELECT * FROM internship", function (err, result, fields) {
      //   if (err) throw err;
      //   console.log(fields);
        res.json({statistic: result })
      // });
    });
  });
}, function(err) {
next(err);
};

exports.count = function(req, res, next) {
  
  var con = mysql.createConnection({
    host: req.body.host,
    user: req.body.dbUser,
    password: req.body.dbPwd,
    database: req.body.name
  });
  
  con.connect(function(err) {
    if (err) throw err;
     
    con.query(`SELECT ${req.body.fieldOne}, COUNT(${req.body.fieldTow})  FROM ${req.body.tableName} GROUP BY ${req.body.fieldOne} `, function (err, result,fields) {
      if (err) throw err;
      console.log(result);
      // con.query("SELECT * FROM internship", function (err, result, fields) {
      //   if (err) throw err;
      //   console.log(fields);
        res.json({statistic: result })
      // });
    });
  });









}, function(err) {
next(err);
};


exports.statistic = function(req, res, next) {
  let results =[]
  var CountResult=[]
  
   
  Config.find({database : req.body.database})
    .populate('database')
    .exec()
    .then(function(configs){
        
       db = configs[0];
      //  console.log(configs);
      console.log( db.database.host);
      var con = mysql.createConnection({
        host: db.database.host,
        user: db.database.dbUser,
        password: db.database.dbPwd,
        database: db.database.name
      });   
      con.connect(function(err) {
         
        if (err) throw err;

        configs.forEach(stat)

        function stat(value){  
          
          var  getInformationFromDB = function(callback) {
         
          con.query(`SELECT ${value.fieldOne}, COUNT(${value.fieldTow})  FROM ${value.tableName} GROUP BY ${value.fieldOne} `, function (err, result,fields) {
           
            if (err)  return callback(err);
            // CountResult.push(result)            
            // console.log(result);
            // count(result)   
            callback(null, result);     
            });         
             
            // function count(value) {
            //   CountResult.push(value)
            //   console.log(CountResult);
                            
            // }
         
          }
          
         
            getInformationFromDB(function (err, result) {
              console.log(result);
              results.push( {title : value.title , SumResult : "SumResult",AvgResult: "AvgResult",Count : result} ) 
          })
         
          //  console.log("out side"+CountResult)
            
              
           


        }
        setTimeout(function() {
          res.json(results);
        }, 300);
          
        
       

      
      });
    




    }, function(err){
      next(err);
    });
};