/*
Esempio su come esportare delle funzioni.
*/

var myModule = {};

myModule.mySortFunction = function(item1, item2){
  if(item1.date < item2.date) return 1;
  if(item1.date > item2.date) return -1;
  return 0;
}

myModule.getBlogById = function(blog, id){
  for(var i=0;i<blog.length;i++){
    if(blog[i].id == id){
      return blog[i];
    }
  }
  return null;
}

module.exports = myModule;