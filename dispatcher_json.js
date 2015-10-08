/*
Example 2 - Return Json instead HTML file.
*/
var http = require('http');

var dispatcher = require('httpdispatcher');

dispatcher.onGet("/", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<html><a href="./page1?cacca=123&param2=456">Open page in JSON</a><br/></html>');
});

dispatcher.onGet("/page1", function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(req.params));
  res.end();
});

var server = http.createServer(function (req, res) {
    dispatcher.dispatch(req, res);
})

server.listen(8080, '127.0.0.1');
console.log('Server running at http://localhost:8080/');
