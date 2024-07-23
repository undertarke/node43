import nodemailer from 'nodemailer';

// yarn add nodemailer

export const sendMail = (to, subject, text) => {

    let configMail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sangrom2003@gmail.com",
            pass: "gonxupsqyplcdcti"
        }
    })

    let infoMail = {
        from: "sangrom2003@gmail.com",
        to,
        subject,
        html: text
    }

    return configMail.sendMail(infoMail, error => error);

}