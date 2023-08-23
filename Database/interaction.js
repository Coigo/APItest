const { createConnection } = require('mysql')
require('dotenv').config()



const conn = createConnection({
  host:process.env.HOST,
  port:process.env.PORT,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
  
})

function CheckIfUsernameExist(UserInfo) {
  console.log('iniciando checagem');

  const { username } = UserInfo;

  return new Promise((resolve, reject) => {
    conn.query("SELECT username FROM users WHERE username = ?", [username], (err, user) => {
      
      if (user.length === 0) {
        console.log('usuario nao existe');
        resolve(true);
      }
      else if (err) {
        reject(err)
      }
      else {
        console.log('existe');
        reject();
      }

    });
  });
}







function SaveNewUser(newUser) {
  console.log('salvando')
  return new Promise((resolve, reject) => {
    const { username, password} = newUser;

      conn.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {

        
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log('> Inserção realizada com sucesso')
        resolve(true); 
      })
      
    })
}

function LoginUser(user) {
  
  return new Promise((resolve, reject) => {
    const { username, password } = user
      conn.query('SELECT username FROM users WHERE username = ? AND password = ?', [username, password], function(err, rows) {
        if (err) {
          reject(err)
        } else {
          console.log(rows)
          resolve(rows)
        }
        
      })
    })
  }







 function fake2(a) {
  console.log(a)
}

module.exports = {
  CheckIfUsernameExist,
  SaveNewUser,
  LoginUser,
fake2,
}