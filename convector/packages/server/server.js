//import { port as serverPort } from './env';
const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join('/home/manelmdiaz/wearhealth-poc/client/build')));

// An api endpoint that add a user
app.get('/api/addUser', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Send new user to register');
});

// An api endpoint that add a device
app.get('/api/addDevice', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Send new user to register');
});

// An api endpoint that returns data of the user
app.get('/api/readUser', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// An api endpoint that add a data
app.get('/api/addData', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Send new user to register');
});

// An api endpoint that returns data
app.get('/api/readData', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// An api endpoint that change user's data
app.get('/api/setUser', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// An api endpoint that change organization's data
app.get('/api/setOrganization', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

//<Route path='/UserAdd' component={UserAdd}/>
//<Route path='/DeviceAdd' component={DeviceAdd}/>
//<Route path='/DataAdd' component={DataAdd}/>
//<Route path='/UserRead' component={UserRead}/>
//<Route path='/DataRead' component={DataRead}/>


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join('/home/manelmdiaz/wearhealth-poc/client/public/index.html'));
});

//const port = process.env.PORT || 8000;
app.listen(port);

console.log('App is listening on port ' + port);
