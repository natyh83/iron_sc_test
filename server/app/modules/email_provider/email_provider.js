const nodemailer = require('nodemailer');

class EmailProvider {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
    }

    send(options){
        return new Promise(async (resolve, reject) => {
            try {
                this.transporter.sendMail(options, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            } catch (e) {
                reject(e);
            }
        })

    }
}

module.exports = EmailProvider ;