 const http = require('http')

//  Create a server

const server = http.createServer((req, res) => {
    console.log('Request made')
})

// Listen for request
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})