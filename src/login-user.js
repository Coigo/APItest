

async function Init_loginUser(UserInfo, LoginFunction) {
    const { LoginUser } = LoginFunction
    
    try {
        const result = await LoginUser(UserInfo)
        console.log(result)
        return result
    }
    catch ( err ) {
        console.log(err)
        throw err
    }
}

module.exports = {
    Init_loginUser,
}