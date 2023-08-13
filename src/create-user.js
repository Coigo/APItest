const { userInfo } = require("os")


async function CreateUser(UserInfo, DataBasefunctions) {
    const {SaveNewUser, CheckIfUsernameExist} = DataBasefunctions
    for (func of DataBasefunctions) {
        func(UserInfo)
    }
}

module.exports = {
    CreateUser
} 