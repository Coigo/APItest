import { createTransport } from 'nodemailer';
import { Request, Response} from 'express'

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


export class MailTO {
   async handle ( req: Request, res: Response ) {
    const { forwardTo } = req.body
    console.log(forwardTo)
    try {
      const mailSent = await transport.sendMail({
          text:'www.google.com',
          subject:'deucerto',
          from:process.env.user,
          to: forwardTo
      })
      console.log(mailSent)
    }
    catch ( err ) {
      console.log(err)
      return res.status(400).end()
    }
  } 
}
