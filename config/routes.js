const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');
const RuleController = require('../controllers/RuleController');

router.post('/authenticate', SessionController.authenticate);

router.post('/users', authMiddleware, UserController.create);
router.get('/users/:id', authMiddleware, UserController.show);

router.post('/rules', authMiddleware, RuleController.create);
router.delete('/rules/:id', authMiddleware, RuleController.destroy);

module.exports = router;
