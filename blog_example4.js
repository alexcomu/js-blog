/*
Example Blog4.
Ordered List of blogs!
*/

var http = require('http');

var dispatcher = require('httpdispatcher');

var blog = [];

var mySortFunction = function(item1, item2){
  if(item1.date < item2.date) return 1;
  if(item1.date > item2.date) return -1;
  return 0;
}

dispatcher.onGet("/", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><title>Welcome to My Blog</title></head>');
  res.write('<body><form action="./" method="POST"><h1>Title</h1><input type="text" name="title"/>');
  res.write('<h2>Content</h2><textarea name="text"></textarea><br/><br/><input type="submit" value="Submit" /></form>');
  if(blog.length > 0){
    blog.forEach(function(element){
      res.write('<br/>********************************************************');
      res.write('<h1>'+element.title+'</h1><p>'+element.date+'<br/><br/>'+element.text+'</p></body></html>');
    });
  }
  res.end();
});


dispatcher.onPost("/", function(req, res) {
  req.params.date = new Date();
  blog.push(req.params);
  blog.sort(mySortFunction);
  res.writeHead(302, {'Location': '/'});
  res.end();
});


var server = http.createServer(function (req, res) {
    dispatcher.dispatch(req, res);
})

server.listen(8080, '0.0.0.0');
console.log('Server running at http://localhost:8080/');
