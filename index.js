const path = require('path')
const http = require('http')
const wrtc = require('wrtc')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {

  socket.on('peer1', data => {
    socket.broadcast.emit('peer2', data)
  })

})

server.listen(3000, () => {
  console.log('listening on 3000')
})
