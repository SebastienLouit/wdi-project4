var express = require('express');
var router  = express.Router();

var usersController           = require('../controllers/usersController');
var teamsController           = require('../controllers/teamsController');
var authenticationsController = require('../controllers/authenticationsController');
var requestsController        = require('../controllers/requestsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .put(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/teams')
  .get(teamsController.teamsIndex)
  .post(teamsController.teamsCreate);

router.route('/teams/:id')
  .get(teamsController.teamsShow)
  .put(teamsController.teamsUpdate)
  .patch(teamsController.teamsUpdate)
  .delete(teamsController.teamsDelete);

// Deprecated
// router.route('/teams/:id/join')
//   .put(teamsController.teamsJoin)
//   .patch(teamsController.teamsJoin);

router.route('/teams/:id/leave')
  .put(teamsController.teamsLeave)
  .patch(teamsController.teamsLeave);

router.route("/users/:id/requests")
  .get(requestsController.requestsIndex);
router.route("/teams/:id/requests")
  .post(requestsController.requestsCreate);
router.route("/teams/:team_id/requests/:id/accept")
  .put(requestsController.requestsAccept);
router.route("/teams/:team_id/requests/:id/reject")
  .put(requestsController.requestsReject);

module.exports = router;
