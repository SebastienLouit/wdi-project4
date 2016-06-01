var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var teamsController = require('../controllers/teamsController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/teams')
  .get(teamsController.teamsIndex)
  .post(teamsController.teamsCreate);

router.route('/teams/:id')
  .get(teamsController.teamsShow)
  .put(teamsController.teamsUpdate)
  .delete(teamsController.teamsDelete);



module.exports = router;
