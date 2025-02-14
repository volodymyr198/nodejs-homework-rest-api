const express = require('express');

const validation = require('../../middlewares/validation');
const { schemas } = require('../../models/user');
const { users: ctrl } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.post(
    '/register',
    validation.registerValid(schemas.registerSchema),
    ctrl.register
);

router.get('/verify/:verificationToken', ctrl.verify);

router.post(
    '/verify',
    validation.emailValid(schemas.emailSchema),
    ctrl.verifyEmail
);

router.post('/login', validation.loginValid(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
    '/',
    authenticate,
    validation.updateSubscriptionValid(schemas.updateSubscriptionSchema),
    ctrl.updateSubscription
);

router.patch(
    '/avatars',
    authenticate,
    upload.single('avatar'),
    ctrl.updateAvatar
);

module.exports = router;
