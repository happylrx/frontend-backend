var express = require('express');
var app = express();

app.use(express.static('build'));
// 用跟本文件平级的一个 public 夹作为静态文件的存放位置

app.get('*', function(req, res){
  res.sendFile('index.html', {root: 'build'});
});
app.listen(8080, function(err) {
  console.log('Listening at http://localhost:8080');
});
