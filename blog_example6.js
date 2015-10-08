/*
Example Blog6.
Added external function used to extract single blog by ID.
Added simple messaging system... very bad :)
*/

var http = require('http');

var dispatcher = require('httpdispatcher');

var blog = [];
var index = 0;

var mySortFunction = function(item1, item2){
  if(item1.date < item2.date) return 1;
  if(item1.date > item2.date) return -1;
  return 0;
}

var getBlogById = function(blog, id){
  for(var i=0;i<blog.length;i++){
    if(blog[i].id == id){
      return blog[i];
    }
  }
  return null;
}


dispatcher.onGet("/", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><title>Welcome to My Blog</title></head>');
  res.write('<body>');
  if(req.params.error){
    res.write('<body><p style="color:red; text-align:center; width:500px;">'+req.params.error+'</p>');
  }
  if(req.params.success){
    res.write('<body><p style="color:green; text-align:center; width:500px;">'+req.params.success+'</p>');
  }
  res.write('<form action="./" method="POST"><h1>Title</h1><input type="text" name="title"/>');
  res.write('<h2>Content</h2><textarea name="text"></textarea><br/><br/><input type="submit" value="Submit" /></form>');
  if(blog.length > 0){
    blog.forEach(function(element){
      res.write('<br/>********************************************************');
      res.write('<h1><a href="/blog?id='+element.id +'"">'+element.title+'</a></h1><p>'+element.date+'<br/><br/>'+element.text+'</p></body></html>');
    });
  }
  res.end();
});


dispatcher.onPost("/", function(req, res) {
  req.params.date = new Date();
  req.params.id = index;
  index++;
  blog.push(req.params);
  blog.sort(mySortFunction);
  res.writeHead(302, {'Location': '/?success=Blog%20Inserted!'});
  res.end();
});


dispatcher.onGet("/blog", function(req, res){
  if(req.params.id){
    var myBlog = getBlogById(blog, req.params.id);
    if(myBlog){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<html><head><title>Welcome to My Blog</title></head>');
      res.write('<a href="/"><- Back</a>')
      res.write('<h1>'+myBlog.id +' - '+myBlog.title+'</h1><p>'+myBlog.date+'<br/><br/>'+myBlog.text+'</p></body></html>');
      res.end();
    }
  }
  res.writeHead(302, {'Location': '/?error=Blog%20Not%20Found!'});
  res.end();
});


var server = http.createServer(function (req, res) {
    dispatcher.dispatch(req, res);
})

server.listen(8080, '0.0.0.0');
console.log('Server running at http://localhost:8080/');
