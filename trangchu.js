var http = require('http');
var fs = require('fs');
var path = require('path');
http.createServer(function (request, response) {

  if (request.method == 'GET') {
    var fileUrl;
    //localhost:3000/ 
    if (request.url == '/')
      fileUrl = '/index.html';
    else // ngược lại thì lấy url, vì nó cũng chính là tên tập tin
      fileUrl = request.url;

    var filePath = path.resolve('./public' + fileUrl);
    fs.exists(filePath, (kiemtra) => {
      if (!kiemtra) {
        response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
        response.end('Không có tập tin');
      }
      else {
        response.writeHead(200, { 'Content-Type': 'text/html'});
        fs.createReadStream(filePath).pipe(response);
      }
    });
  }
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');