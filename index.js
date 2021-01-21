require('dotenv').config();
const server=require('../node-api2-project/server');

PORT= process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`Server listening in port ${PORT}`)
})