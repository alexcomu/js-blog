/*
Example Blog8.
Edit & Remove Post added
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
      res.write('<h1><a href="/blog?id='+element.id +'"">'+element.title+'</a>');
      /*DELETE ACTION*/
      res.write('<form style="display:inline; margin-left:30px" method="POST" action="/delete">');
      res.write('<input type="hidden" name="blogid" value='+element.id +'>');
      res.write('<button style="border: none; color: white; background-color: white;" type="submit"> <img height="30" width="30" src="http://findicons.com/files/icons/1580/devine_icons_part_2/128/trash_recyclebin_empty_closed.png"></button></form>');
      /*EDIT ACTION*/
      res.write('<a style="display:inline; margin-left:30px" href="/blog/edit?id='+element.id +'"">');
      res.write('<img height="30" width="30" src="http://www.clker.com/cliparts/4/3/2/e/12065629511862768218qubodup_16x16px-capable_black_and_white_icons_12.svg.med.png"></a>');
      res.write('</h1><p>'+element.date+'<br/><br/>'+element.text+'</p></body></html>');
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

dispatcher.onPost("/delete", function(req, res) {
  if(req.params.blogid){
    /*First step: get the index of blog*/
    var index = blog.indexOf(getBlogById(blog,req.params.blogid));
    /*If the index is valid*/
    if (index> -1) {
      /*remove the correct blog from the blog's array.*/
      blog.splice(index,1);
    };
    res.writeHead(302, {'Location': '/?success=Blog%20Deleted!'});
  }else
    res.writeHead(302, {'Location': '/?error=Blog%20Not%20Found!'});

  res.end();
});

dispatcher.onPost("/edit", function(req, res) {
  if(req.params.blogid){
    /*First step: get the index of blog*/
    var index = blog.indexOf(getBlogById(blog,req.params.blogid));
    /*If the index is valid*/
    if (index> -1) {
      /*remove the correct blog from the blog's array.*/
      blog.splice(index,1);
      req.params.date = new Date();
      req.params.id = index;
      index++;
      blog.push(req.params);
      blog.sort(mySortFunction);
      res.writeHead(302, {'Location': '/?success=Blog%20Edited!'});
      res.end();
    };

  }else
    res.writeHead(302, {'Location': '/?error=Blog%20Not%20Found!'});

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

dispatcher.onGet("/blog/edit", function(req, res){
  if(req.params.id){
    var myBlog = getBlogById(blog, req.params.id);
    if(myBlog){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<html><head><title>Welcome to My Blog</title></head>');
      res.write('<a href="/"><- Back</a>')
      res.write('<form action="/edit" method="POST"><h2>Edit</h2><input type="text" name="title" value="'+myBlog.title+'">');
      res.write('<input type="text" name="text" value="'+myBlog.text+'">');
      res.write('<input type="hidden" name="blogid" value="'+myBlog.id+'">');
      res.write('<input type="Submit" value="Submit"></form></body></html>');
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
