const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const validation = require('../../middlewares/validation');
const contactSchema = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validation(contactSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validation(contactSchema), ctrl.updateContact);

module.exports = router;
