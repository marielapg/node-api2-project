const server = require('./api/server.js');

const port = 8000;

server.listen(port, ()=>{
    console.log(`\n Server is running on ${port} \n`);
})