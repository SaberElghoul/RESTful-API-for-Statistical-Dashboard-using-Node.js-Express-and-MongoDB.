var router = require('express').Router();
 
var controller =require('./configController')
// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);

router.post('/',controller.get)
router.post('/add',controller.post)

router.route('/statistic/avg')
  .post(controller.avg)

router.route('/statistic/avg')
  .post(controller.avg)

router.route('/statistic')
  .post(controller.statistic)

router.route('/statistic/count')
  .post(controller.count)


router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)


module.exports = router;
