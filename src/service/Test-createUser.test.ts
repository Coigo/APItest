import { expect, test } from 'vitest'
import { CreateUser_service, userProps } from './createUser.service.ts'

test('Criar usuário normalmente', () => {
    const checkInstance = new CreateUser_service({
        email: 'teste@teste.com' ,
        username: 'username',
        password: 'password',
        usernameIsAvaliable: true,
        emailIsAvaliable: true
    } as userProps)

    expect(checkInstance).toBeInstanceOf(CreateUser_service)
    expect(checkInstance.username).toEqual('username')
})

//_____________________________________________________________________________

test('Erro ao criar sem usuario ou senha disponiveis', () => {
    
    expect(() => {
        return new CreateUser_service({
            email: 'teste@teste.com' ,
            username: 'username',
            password: 'password',
            usernameIsAvaliable: false,
            emailIsAvaliable: true
    } as userProps)
    }).toThrow()

    expect(() => {
        return new CreateUser_service({
            email: 'teste@teste.com' ,
            username: 'username',
            password: 'password',
            usernameIsAvaliable: false,
            emailIsAvaliable: true
    } as userProps)
    }).toThrow()

    expect(() => {
        return new CreateUser_service({
            email: 'teste@teste.com' ,
            username: 'username',
            password: 'password',
            usernameIsAvaliable: false,
            emailIsAvaliable: false
    } as userProps)
    }).toThrow()

    expect(() => {
        return new CreateUser_service({
            email: 'teste@teste.com' ,
            username: 'username',
            password: 'password',
            emailIsAvaliable: false
    } as userProps)
    }).toThrow()
})

//______________________________________________________________________________