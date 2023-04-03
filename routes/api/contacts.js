const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const validation = require('../../middlewares/validation');
const addContactSchema = require('../../schemas/contacts/addContacts');
const updateContactSchema = require('../../schemas/contacts/updateContacts');
const updateStatusContactSchema = require('../../schemas/contacts/updateStatusContact');
const isValidId = require('../../middlewares/isValidId');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validation.addValid(addContactSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put(
    '/:contactId',
    isValidId,
    validation.updateValid(updateContactSchema),
    ctrl.updateContact
);

router.patch(
    '/:contactId/favorite',
    validation.updateFavValid(updateStatusContactSchema),
    ctrl.updateStatusContact
);

module.exports = router;
