1. npm install
    a. run with npm start
    b. can change what you use to name start
2. npm install express --D  // to save to DevDependencies
3. npm run server // this is to run specifically nodemon for restarting automatically


4. Add to the | index.js | file the required info:
    
    const express = require("express")

    const server = express()
    const port = 2020

    server.use(express.json())

    server.get("/", (req, res) => {
	    res.json({
		    message: "Welcome to our API",
	    })
    })

    // CRUD operations here

    // Put on the last line
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    })

5. 