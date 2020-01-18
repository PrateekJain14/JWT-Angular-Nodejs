const _ = require('lodash');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

var TODOS = [
    { 'id': 1, 'user_id': 1, 'name': "Get Milk", 'completed': false },
    { 'id': 2, 'user_id': 1, 'name': "Fetch Kids", 'completed': true },
    { 'id': 3, 'user_id': 2, 'name': "Buy flowers for wife", 'completed': false },
    { 'id': 4, 'user_id': 3, 'name': "Finish Angular JWT Todo App", 'completed': false },
];
var USERS = [
    { 'id': 1, 'username': 'prateek' },
    { 'id': 2, 'username': 'newUser' },
    { 'id': 3, 'username': 'olduser' },
];

app.use(bodyParser.json());
app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth']}));

function getTodos(userID) {
    var todos = _.filter(TODOS, ['user_id', userID]);

    return todos;
}
function getTodo(todoID) {
    var todo = _.find(TODOS, function (todo) { return todo.id == todoID; })

    return todo;
}
function getUsers() {
    return USERS;
}

app.post('/api/auth', function(req,res){
    const body = req.body;

    const user = USERS.find(user => user.username == body.username);
    if(!user || body.password != 'password') return res.sendStatus(401);
    
    var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '1h'});
    res.send({token});
});
app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});
app.get('/api/todos', function (req, res) {
    res.type("json");
    res.send(getTodos('1'));
});

app.get('/api/users', function (req, res) {
    res.type("json");
    res.send(getUsers());
});

app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});
