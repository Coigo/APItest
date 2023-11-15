import { createTransport } from 'nodemailer';
import { passwordToken } from '../modules.ts';


import dotenv from 'dotenv';
import { CustomError } from '../costumError.ts';
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

  type mailType = {
    email: string
    token: string
  }

const transport = createTransport({
    service: process.env.service, 
    port: Number (process.env.port),
    secure: false,
    auth: {
        user: process.env.user,
        pass:process.env.pass
    },
    tls: {
        rejectUnauthorized:false
    }
} as mailOption)  


export class Mail_Service {


  private props: mailType


   async mail () {
    const email = this.props.email
    const token = this.props.token

    try {

      const mailSent = await transport.sendMail({
        text:`http://localhost:4001/setPassword?token=${token}`,
        subject:'deucerto',
        from: process.env.user,
        to: email
      })

    }
    catch ( err ) {
      console.log(err)
      throw new Error('Erro ao mandar o email')
    }
  } 


  constructor ( props: mailType ) {
    
    if ( !props.email && ! props.token ) {
      throw new CustomError('Email ou token não informados', 400)
    }

    this.props = props

  }

}
