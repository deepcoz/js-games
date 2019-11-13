'use strict';
var path = require('path');
const express = require('express')
const app = express()
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
