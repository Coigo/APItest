import { expect, test } from "vitest";
import { UpdateUser } from "./update-user.ts";
import exp from "constants";


test ('Atualizar username normalmente', async () => {
    const updateUser = await new UpdateUser( { username:'Fulano', id:1 }, 'username')

    expect(updateUser).toBeInstanceOf(UpdateUser)
    expect(updateUser.update()).toBeTruthy
    expect(updateUser.username).toBe('Fulano')
})

test ('Atualizar senha normalmente', async () => {
    const updateUser = await new UpdateUser( { password:'123', id:1 }, 'password')

    expect(updateUser).toBeInstanceOf(UpdateUser)
    expect(updateUser.update()).toBeTruthy
    expect(updateUser.password).toBe('123')
})

test('Não atualizar username se um parametro estiver errado', async () => {
    const updateUser = await new UpdateUser({ username:'Fulano', id:1 }, 'username')

    expect(updateUser).toBeInstanceOf(UpdateUser)
    expect(updateUser.update).toBeFalsy
    expect(updateUser.username).toBe('Fulano')

})