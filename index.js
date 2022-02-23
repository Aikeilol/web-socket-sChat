import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const whiteList = ['/index.html', '/style.css', '/script.js', '/favicon.ico']
const webSockets = [];

wss.on('connection', function connection(ws) {
  webSockets.push(ws);

  ws.on('message', function message(data) {
    webSockets.forEach(socket => {
      if (socket != ws) {
        socket.send(data.toString())
      }
    })
  });
});

http.createServer((request, response) => {
  if (whiteList.includes(request.url)) {
    return fs.createReadStream('.' + request.url).pipe(response)
  }
}).listen(3000);
