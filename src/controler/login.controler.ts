import { Request, Response } from "express";
import { Login_repository } from "../repository/loginUser.ts";
import { LoginUser_service } from "../service/login-user.service.ts";

export class Login_controler {
    async handle ( req:Request, res:Response ) {
        try {
            const props = req.body
            const loginRequest = new LoginUser_service( props , new Login_repository() )
            const login = await loginRequest.login() 

            if ( login ) {
                return res.send(login).status(200)
            }
            return res.status(400).end()
        }
        catch ( err ) {
            return res.status(500).end()
        }
    }
}