
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const { authUser, authpage } = require('./autorisation')


var users = [
    {userId:1, username:"Toto", email:"Toto@gmail.com", password:"Toto", status: 1},
    {userId:2, username:"Test1", email:"test1@gmail.com", password:"Toto",  status: 1},
    {userId:3, username:"Test2", email:"test2@gmail.com", password:"Toto", status: 0},
    {userId:4, username:"Test3", email:"test3@gmail.com", password:"Toto", status: 1},
    {userId:5, username:"Test4", email:"test4@gmail.com", password:"Toto", status: 0},
    {userId:6, username:"Test5", email:"test5@gmail.com", password:"Toto", status: 1},

];




app.get('/api/users',  authpage(["customers", "admin"]), (req, res) => {
    res.send(users);
});
app.get('/api/users/:userId', (req, res) => {
    const user = users.find(b => b.userId === parseInt(req.params.userId));
    if(!user) return res.status(404).send('the user with the given ID was not found...')
    res.send(user);
});

app.delete('/api/users/:userId', (req, res) => {
    users = users.filter(b => b.userId != parseInt(req.params.userId));
    res.send(users);
});

app.post('/api/users', bodyParser.json(), (req, res) => {
    const user = {
        userId: users.length +1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
    };
    users.push(user);
    res.send(user);
});

app.put('/api/users/:userId', (req, res, next) => {
    /*console.log(req.body);
      const {userId} = req.params;
      const changes = req.body;

      const index = users.findIndex(p => p.userId === userId);
      if (index == -1){
        users[index] = changes;
        res.status(200).json(changes);
      }else{
        res.status(404).json({ message: 'User does not exist' });
      }*/  

    /*console.log(req.params.userId);
    users.find({_userId:req.params.userId}, {
        $ret:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
        }
    })
    .then(result => {
        res.status(200).json({
            updated_user:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })*/
    
    let userId = req.params.userId;
    let userName = req.body.username;
    let pass = req.body.password;
    let index = -1;
    for(let user of users){
        if(user.userId === parseInt(userId)){
            index = users.userId - 1;
        }
    }

    if(index >= 0){
        let user = users[index];
        user.username = userName;
        user.password = pass;
        res.send(user);
        //console.log(user);
    }else{
        res.status(404)
        res.send({error: "User id not correct !"})
    }
      
});



// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
  });
  