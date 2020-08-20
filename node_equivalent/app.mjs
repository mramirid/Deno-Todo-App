import http from 'http'

const server = http.createServer((_, res) => {
  res.end('Hello world - from Node')
})

server.listen(3000)