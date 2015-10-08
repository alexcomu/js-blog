/*
Example 1 - Simple app
*/

var http = require('http');

var dispatcher = require('httpdispatcher');

dispatcher.onGet("/", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<html><a href="./page1">Page1</a><br/><form method="POST" action="./page2"><input type="submit" value="page2" /></form></html>');
});

dispatcher.onGet("/page1", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Page One');
});

dispatcher.onPost("/page2", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Page Two');
});

var server = http.createServer(function (req, res) {
    dispatcher.dispatch(req, res);
})

server.listen(8080, '127.0.0.1');
console.log('Server running at http://localhost:8080/');
