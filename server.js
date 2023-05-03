 const http = require('http')

//  Create a server

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    // Set header Content type
    res.setHeader('Content-Type', 'text/plain')
    res.write('The Lord is Good')
    res.end()

})

// Listen for request
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})