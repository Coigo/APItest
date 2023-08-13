function CheckIfUsernameExist(UserInfo) {
    return new Promise((naoExiste, existe) => {
      const { username } = UserInfo
      db.all("Select Username from usuarios where Username = ?", [username], (err, user) => {
        
        if ( user[0] == undefined) { naoExiste(err) }
        else if (err) {
            console.log(err)
        }
        else { existe(user) }
        
      })
    })
  }


function SaveNewUser(newUser) {
  return new Promise((resolve, reject) => {
    const { username, password, id } = newUser;

    function InsertNewUser() {
      db.run('INSERT INTO usuarios (Username, Password, id) VALUES (?, ?, ?)', [username, password, id], function(err) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log('> Inserção realizada com sucesso.');

        resolve(); // Resolve the Promise when the user is successfully inserted.
      });
    }

    InsertNewUser();
  });
}

 function fake1(a) {
  console.log(a)
}
 function fake2(a) {
  console.log(a)
}

module.exports = {
  CheckIfUsernameExist,
  SaveNewUser,
  fake1, fake2,
}