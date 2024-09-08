const nodemailer = require("nodemailer")

const sendMail =async (options) =>{

    const transport = {
        port:process.env.SMTP_PORT,
        host:process.env.SMTP_HOST,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    }

    const transporter = nodemailer.createTransport(transport)

    const message = {
        from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(message)

}

module.exports=sendMail;