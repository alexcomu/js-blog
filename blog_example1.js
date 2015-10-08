/*
Example Blog1.
Simple blog creation.
*/

var http = require('http');

var dispatcher = require('httpdispatcher');

var blog = null;

dispatcher.onGet("/", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><title>Welcome to My Blog</title></head>');
  res.write('<body><form action="./save" method="POST"><h1>Title</h1><input type="text" name="title"/><h2>Content</h2><textarea name="text"></textarea><br/><br/><input type="submit" value="Submit" /></form>');
  if(blog){
  	res.write('<br/>********************************************************');
  	res.write('<h1>'+blog.title+'</h1><p>'+blog.text+'</p></body></html>');
  }
  res.end();
});

dispatcher.onPost("/save", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  blog = req.params;
  res.write('<html><head><title>This is my blog!</title></head>');
  res.write('<body><h1>Blog inserted!!</h1><h2>'+blog.title+'</h1><p>'+blog.text+'</p>');
  res.write('<h3><a href="/">Back to INDEX</a></h3></body></html>')
  res.end();
});

var server = http.createServer(function (req, res) {
    dispatcher.dispatch(req, res);
})

server.listen(8080, '0.0.0.0');
console.log('Server running at http://localhost:8080/');
