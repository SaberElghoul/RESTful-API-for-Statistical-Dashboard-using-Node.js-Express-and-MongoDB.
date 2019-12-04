var router = require('express').Router();


router.use('/users', require('./user/userRoutes'));
router.use('/databases', require('./database/databaseRoutes'));
router.use('/configs', require('./config/configRoutes'));

module.exports = router;
