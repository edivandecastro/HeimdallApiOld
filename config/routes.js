const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');
const RuleController = require('../controllers/RuleController');

router.post('/authenticate', SessionController.authenticate);
router.get('/authenticate/validate', authMiddleware, SessionController.tokenValidate);

router.post('/users', authMiddleware, UserController.create);
router.get('/users/:id', authMiddleware, UserController.show);
router.get('/users/:id/rules', authMiddleware, RuleController.showRulesOfUser);

router.post('/rules', authMiddleware, RuleController.create);
router.delete('/rules/:id', authMiddleware, RuleController.destroy);
router.delete('/rules/:id/action/:action', authMiddleware, RuleController.destroyAction);
router.get('/rules/:id/action/:action', authMiddleware, RuleController.addAction);
router.get('/rules/:id', authMiddleware, RuleController.show);
router.put('/rules/:id', authMiddleware, RuleController.update);
router.put('/rules', authMiddleware, RuleController.updateByUserAndResource);

router.post('/rules/authorization', authMiddleware, RuleController.authorize);

module.exports = router;
