const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join('/home/manelmdiaz/wearhealth-poc/client/build')));
// An api endpoint that returns a short list of items
app.get('/api/readData', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/api/addUser', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Send new user to register');
});

app.get('/api/addUser', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Send new user to register');
});

//<Route path='/UserAdd' component={UserAdd}/>
//<Route path='/DeviceAdd' component={DeviceAdd}/>
//<Route path='/DataAdd' component={DataAdd}/>
//<Route path='/UserRead' component={UserRead}/>
//<Route path='/DataRead' component={DataRead}/>


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join('/home/manelmdiaz/wearhealth-poc/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
