var router = require('express').Router();
 
var controller =require('./userController')
// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);

router.route('/register')
   
  .post(controller.post)

router.route('/login')
  .post(controller.getOne)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)


module.exports = router;

