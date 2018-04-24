var ip   = "127.0.0.1",
    port = 8080,
    http = require('http');
var fs = require('fs');
var path = './ten_input.html';
var util = require('util')
 
function onRequest(request, response) {
    console.log("Request received.");
	switch(request.url){
		case '/':
			response.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});    
			response.write("Hello World Hello World. This is my werbserver!\n");
			response.write("你好世界 世界你好 這是一個NODEjs伺服器!\n");
			response.write("這是一個中英混合編碼測試");
			response.end();
			break;
		case '/test':
			fs.readFile(path,function(err,data){
				if (err) {
					response.writeHead(404, {'Content-Type': 'text/html'});
				} else {
					response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					response.write(data);
				}
				response.end();
			});
			break;
	}
}
http.createServer(onRequest).listen(port, ip);
console.log("My server has started.");