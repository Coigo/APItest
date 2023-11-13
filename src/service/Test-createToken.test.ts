import { test, expect } from "vitest";
import { CreateUpdateToken } from "./createUpdateToken.service.ts";



test('Criar um novo token normalmente', async () => {
    const newToken = new CreateUpdateToken({password: 'nova senha'})

    expect(newToken).toBeInstanceOf(CreateUpdateToken)
    expect( await newToken.create() ).toBeTruthy

})

test('Erro ao nao passar um parametro', async () => {
    const newToken = new CreateUpdateToken({})

    expect(newToken).toBeInstanceOf(CreateUpdateToken)
    expect(newToken.create).toThrow
})