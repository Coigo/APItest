import { createTransport } from 'nodemailer';


import dotenv from 'dotenv';
dotenv.config();

type mailOption = {
    service: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    tls: {
      rejectUnauthorized: boolean;
    };
  };

if (!process.env.service || !process.env.port || !process.env.user || !process.env.pass) {
    console.error('Certifique-se de definir as variáveis de ambiente host, port, user e pass.');
    process.exit(1);
  }

const transport = createTransport({
    service: process.env.service, 
    port: Number(process.env.port),
    secure: false,
    auth: {
        user: process.env.user,
        pass:process.env.pass
    },
    tls: {
        rejectUnauthorized:false
    }
} as mailOption)  



async function sendEmail() {
    const mailSent = await transport.sendMail({
        text:'deu certo',
        subject:'deucerto',
        from:process.env.user,
        to:"Codigo.TOLMR@gmail.com"
    })
    console.log(mailSent)
}
sendEmail()