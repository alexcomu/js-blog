/*
Example Blog2.
Added redirect after save blog.
*/
var http = require('http');

var dispatcher = require('httpdispatcher');

var blog = null;

dispatcher.onGet("/", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><title>Welcome to My Blog</title></head>');
  res.write('<body><form action="./" method="POST"><h1>Title</h1><input type="text" name="title"/><h2>Content</h2><textarea name="text"></textarea><br/><br/><input type="submit" value="Submit" /></form>');
  if(blog){
  	res.write('<br/>********************************************************');
  	res.write('<h1>'+blog.title+'</h1><p>'+blog.text+'</p></body></html>');
  }
  res.end();
});


dispatcher.onPost("/", function(req, res) {
  blog = req.params;
  res.writeHead(302, {'Location': '/'});
  res.end();
});


var server = http.createServer(function (req, res) {
    dispatcher.dispatch(req, res);
})

server.listen(8080, '0.0.0.0');
console.log('Server running at http://localhost:8080/');
