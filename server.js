 const http = require('http')
 const fs = require('fs')

//  Create a server

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    // Set header Content type
    res.setHeader('Content-Type', 'text/html')
    
    // send an html file
    fs.readFile('./views/index.html', (err, data) => {
        if(err){
            console.log(err)
        } else {
            // res.write(data)
            res.end(data)
        }
    })

})

// Listen for request
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})