const { BadRequest, NotFound } = require('http-errors');

const { User } = require('../../models/user');
const sendEmail = require('../../helpers/sendEmail');
const { BASE_URL } = process.env;

const verifyEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new NotFound('Email not found');
        }
        if (user.verify) {
            throw new BadRequest('Verification has already been passed');
        }

        const verifyEmail = {
            to: email,
            subject: 'Verify your email',
            html: `<a target="_blank" href="${BASE_URL}/users/veryfy/${user.verificationToken}">Click verify email</a>`,
        };

        await sendEmail(verifyEmail);

        res.json({ message: 'Verification email sent' });
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyEmail;
