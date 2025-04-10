import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: true,
    tls: { rejectUnauthorized: true }
});

export const sendVerificationEmail = (email, token) => {
    const url = `${process.env.APP_URL}${process.env.API_VERSION}/auth/verify/${token}`;
    return transporter.sendMail({
        from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your account',
        html: `<a href="${url}">Click here to verify</a>`
    });
};

export const sendPasswordResetEmail = (email, token) => {
    const url = `${process.env.APP_URL}${process.env.API_VERSION}/auth/reset-password?token=${token}`;
    return transporter.sendMail({
        from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password reset',
        html: `<a href="${url}">Reset your password</a>`
    });
};