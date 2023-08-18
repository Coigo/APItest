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
    conn.query("SELECT Username FROM usuarios WHERE Username = ?", [username], (err, user) => {
      
      if (user.length === 0) {
        console.log('usuario nao existe');
        resolve('ok');
      } else {
        console.log('existe');
        reject(new Error('Username already exists.'));
      }

    });
  });
}

// Assuming you have properly configured 'conn' before this point
CheckIfUsernameExist({
  username: 'aaaa',
  password: 'bbb'
})
  .then(() => {
    console.log('usuario nao existeaaaaa');
  })
  .catch((error) => {
    console.error(error.message); // Log the error message
  });




function SaveNewUser(newUser) {
  console.log('salvando')
  return new Promise((resolve, reject) => {
    const { username, password, id } = newUser;

      conn.query('INSERT INTO usuarios (Username, Password, id) VALUES (?, ?, ?)', [username, password, id], function(err) {
      conn.end(() => {
        
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log('> Inserção realizada com sucesso')
        resolve('ok'); // Resolve the Promise when the user is successfully inserted.
      })
      });
    })
}







 function fake2(a) {
  console.log(a)
}

module.exports = {
  CheckIfUsernameExist,
  SaveNewUser,
fake2,
}