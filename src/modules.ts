import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { randomUUID, createHash } from 'crypto';


dotenv.config();

const SECRET: string | undefined = process.env.JWT_SECRET;
interface JWT {
  sub: string,
  username:string,
  id:number,
  iat:number
}

type userToken = {
  id:number, 
  username:string
}

if (SECRET === undefined) {
  throw new Error("A variável de ambiente JWT_SECRET não está definida.");
}




export const token = (user: userToken) => {
  const { id, username } = user
  return jwt.sign({ id , username }, SECRET,  { expiresIn: 10000 })
} 

export const decode  = (token: string) => {
  const result = jwt.verify(token, SECRET) as JWT
  return result
};


export const passwordToken = async () => {
  const token = randomUUID()

  return token
}

export const encryptedPassword = ( password: string ) => {
  return createHash('md5').update(password).digest("base64url")
}