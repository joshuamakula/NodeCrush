 const http = require('http')
 const fs = require('fs')

//  Create a server

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    // Set header Content type
    res.setHeader('Content-Type', 'text/html')

    // routing path
    let path = './views/'
    switch(req.url){
        case '/':
            path += 'index.html'
            break
        case '/about':
            path += 'about.html'
            break
        default:
            path += '404.html'
            break
    }
    
    // send an html file
    fs.readFile(path, (err, data) => {
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