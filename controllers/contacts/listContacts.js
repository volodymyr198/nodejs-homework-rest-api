const Contact = require('../../models/contact');

const listContacts = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        console.log(owner);
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find(
            { owner, favorite: false },
            'name phone favorite',
            {
                skip,
                limit,
            }
        );

        // const result = await Contact.find({ owner }, 'name phone', {
        //     skip,
        //     limit,
        // }).populate('owner', 'name email subscription');
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = listContacts;
