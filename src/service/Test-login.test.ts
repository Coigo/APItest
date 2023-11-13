import { LoginUser_service } from "./login-user.service.ts";
import { expect, test } from "vitest";

test("Deveria ser possivel fazer login normalmente", async () => {

        const expected = {id:1, username:'Jhon Doe', password:'123', email:'teste@gmail.com'}

        const loginInstance = await new LoginUser_service( { username: "Jhon Doe", password: "123" } )
    
    expect(loginInstance).toBeInstanceOf(LoginUser_service)
    expect( await loginInstance.login()).toEqual( expected )
})

test("Não deveria ser possivel fazer login sem um usuario correto", async () => {

    const loginInstance = await new LoginUser_service( { username: 'Teste', password: "123" } )

    expect(loginInstance).toBeInstanceOf(LoginUser_service)
    expect(loginInstance.login).toBeNull
})

