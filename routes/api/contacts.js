const express = require('express');
const { NotFound } = require('http-errors');
const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string()
        .regex(/^[0-9 ()-]+$/)

        .required(),
});

const contacts = require('../../models/contacts');

const router = express.Router();

router.get('/', async (_, res, next) => {
    try {
        const result = await contacts.listContacts();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);

        if (!result) {
            throw new NotFound(`Contact with id:${contactId} not found`);
        }

        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: 'missing required name field',
            });
        }
        const result = await contacts.addContact(req.body);

        res.status(201).json({ result });
    } catch (error) {
        next(error);
    }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw new NotFound(`Contact with id:${contactId} not found`);
        }
        res.status(200).json({ message: 'contact deleted' });
    } catch (error) {
        next(error);
    }
});

router.put('/:contactId', async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'missing fields' });
        }
        const { error } = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: 'missing required name field',
            });
        }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);

        if (!result) {
            throw new NotFound('Not found');
        }
        res.status(200).json({ result });
    } catch (error) {}
});

module.exports = router;
