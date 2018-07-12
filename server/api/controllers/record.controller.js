const mongoose = require('mongoose');
const Record = require('../models/record.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const record = new Record(req.body);
  record.user = req.user._id;

  record.save()
  .then((newRecord) => {
    res.json(newRecord);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.record, req.body);

  req.record.save()
  .then((updatedRecord) => {
    res.json(updatedRecord);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.record);
}

function list(req, res, next) {
  const limit = req.query.limit * 1;
  let where = {};
  if (req.user.role === ROLES.USER) {
    where = { user: req.user._id };
  }

  Record.find(where)
  .sort({ date: -1 })
  .limit(limit)
  .populate('user')
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.record.remove(() => {
    res.json(req.record);
  })
  .catch(next);
}

function weeklyReport(req, res) {
  let where = {};
  if (req.user.role === ROLES.USER) {
    where = { user: new mongoose.Types.ObjectId(req.user._id) };
  }

  Record.aggregate([
    {
      $match: where,
    },
    {
      $group: {
        _id: { year: { $year: '$date' }, week: { $week: '$date' } },
        totalDistance: { $sum: '$distance' },
        totalDuration: { $sum: '$duration' },
        count: { $sum: 1 },
      },
    },
  ]).exec((err, reports) => {
    if (err) {
      return res.status(422).send({
        message: err.message,
      });
    }

    return res.json(reports);
  });
}

function getRecordByID(req, res, next, id) {
  Record.findById(id)
  .then((record) => {
    if (!record) {
      res.status(404).json({ message: 'Record not found' });
      return;
    }

    if (record.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
      res.status(403).json({ message: 'You are not authorized to access this record' });
      return;
    }

    req.record = record;
    next();
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  weeklyReport,
  getRecordByID,
};
