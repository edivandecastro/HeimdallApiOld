const express = require('express');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');

router.post('/authenticate', SessionController.authenticate);
router.post('/users', UserController.create);
router.get('/users/:id', UserController.show);

module.exports = router;
