var router = require('express').Router();
 
var controller =require('./databaseController')
// setup boilerplate route jsut to satisfy a request
// for building


router.param('id', controller.params);

router.route('/tables')
  .post(controller.getTableAndFields)

// router.route('/statistic')
//   .get(controller.avg)

router.route('/fields')
  .post(controller.getFields)


router.route('/add')
  .post(controller.post)

router.route('/')
  .post(controller.get)
  

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)



module.exports = router;
