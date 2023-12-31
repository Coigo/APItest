import { expect, test } from "vitest";
import { UserCheck, userInformation } from "./check-user.service.ts";

const info: userInformation = { username: 'Fulano' };
const method: string = 'username';


test('Deveria ser ok ao procurar por um USUÁRIO que NÃo existe', async () => {
    const search = await new UserCheck( { username:'Ciclano' } , 'username')
    console.log(await search.check_user())
    expect(search).toBeInstanceOf(UserCheck)
    expect( await search.check_user()).toEqual({ method:'username', free:true })
})
test('Deveria ser ok ao procurar por um EMAIL que NÃo existe', async () => {
    const search = await new UserCheck( { email:'teste@teste.com' }, 'email' ) 

    expect(search).toBeInstanceOf(UserCheck)
    expect( await search.check_user() ).toEqual({ method:'email', free:true })
})



test('Não deveria ser ok ao procurar por um EMAIL que EXISTE', async () => {
    const search = await new UserCheck( { username:'Fulano' }, 'username' )

    expect(search).toBeInstanceOf(UserCheck)
    expect( await search.check_user()).toEqual({ method:'username', free:false })
})
test('Não deveria ser ok ao procurar por um USUÁRIO que EXISTE', async () => {
    const search = await new UserCheck( { email:'email@teste.com' }, 'email' )

    expect(search).toBeInstanceOf(UserCheck)
    expect( await search.check_user()).toEqual({ method:'email', free:false })
})

test('Erro ao passar um metodo inválido', async () => {
    expect(() => new UserCheck({username: 'username'}, 'wrong_method') ).toThrow()
    
})
