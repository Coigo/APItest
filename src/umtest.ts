
type Address = {
    street: string,
    number: number
}

type User = {
    name: string,
    age: number,
    address: Address
}

type UserProperty = keyof User

function pick(user: User, property: UserProperty) {
    return user[property]
}
const user: User = {
    name:'123',
    age: 23,
    address: {
        street:'casc',
        number: 123
    }
}

console.log(pick(user, 'address'))

// ------------------------------------------------------------------------

const VariavelJS = {
    nome:'aldemir',
    idade:23
}

type pessoa = keyof typeof VariavelJS

const novapessoa: pessoa = { //isso funciona por algum motivo, mas da erro, funciona de qualquer jeito na vdd
    nome:'123123',
    idade:13
}

console.log(novapessoa)

//-------------------------------------------------------------------------


type PickPropertyReturnType = ReturnType<typeof pick>

