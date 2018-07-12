const express = require('express');
const recordCtrl = require('../controllers/record.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
router.use(policies.checkRoles([ROLES.ADMIN, ROLES.USER, ROLES.MANAGER]));

router.route('/')
  .get(recordCtrl.list)
  .post(recordCtrl.create);

router.route('/report')
  .get(recordCtrl.weeklyReport);

router.route('/:recordId')
  .get(recordCtrl.read)
  .put(recordCtrl.update)
  .delete(recordCtrl.remove);

router.param('recordId', recordCtrl.getRecordByID);

module.exports = router;
