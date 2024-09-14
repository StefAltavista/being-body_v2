import nodemailer from "nodemailer";

const EMAIL_TO = process.env.EMAIL_TO;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: { user: EMAIL_FROM, pass: EMAIL_PASS },
});

const sendMessage = (subject: string, message: string) => {
    const title = subject.replace("New Client Sheet: ", "");

    const attachments =
        subject != "New Booking Request from Beingbody.net"
            ? [
                  {
                      filename: `${title}.pdf`,
                      path: `./files/${title}.pdf`,
                      contentType: "application/pdf",
                  },
              ]
            : null;

    return new Promise((resolve, reject) => {
        const options = {
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject,
            html: message,
            attachments,
        };

        transporter.sendMail(options, function (e, info) {
            if (e) {
                console.log("ERROR Message NOT sent", e);
                reject({
                    e,
                    info,
                    result: ":/ sorry there was a probelem with the server. Please try again or send the info directly at being.body.practice@gmail.com",
                });
            }

            resolve({
                e: null,
                result: "Message sent!",
            });
        });
    });
};

module.exports = sendMessage;
