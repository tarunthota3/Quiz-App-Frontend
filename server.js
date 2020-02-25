const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', express.static(path.join(__dirname, './', 'build')));

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})