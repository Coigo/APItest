import { createTransport } from 'nodemailer';
import { Request, Response} from 'express'
import { passwordToken } from '../modules.ts';
import { savePasswordToken } from '../repository/savePasswordToken.ts';

const saveToken = new savePasswordToken()

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
    const { email } = req.body
    console.log(req)
    console.log(email)
    try {
      const token = await passwordToken()
      const mailSent = await transport.sendMail({
        text:`http://localhost:4001/setPassword?token=${token}`,
        subject:'deucerto',
        from: process.env.user,
        to: email
      })
      await saveToken.handle(token, email)
    }
    catch ( err ) {
      console.log(err)
      return res.status(400).end()
    }
  } 
}
