const wrtc = require('wrtc')
const Peer = require('simple-peer')
const io = require('socket.io-client')


navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    const socket = io.connect('/')
    const peer = new Peer({
      wrtc,
      stream,
      channelName: 'foobarfoo',
      initiator: location.hash === '#init',
      config: {
        iceServers: [
          {
            urls: 'stun:138.197.194.125:3478'
          },
          {
            urls: 'turn:138.197.194.125:3478',
            username: 'tim',
            credential: 'foobar'
          }
        ]
      }
    })
    peer.on('signal', data => {
      console.log('peer signal', data)
      socket.emit('peer1', data)
    })

    socket.on('peer2', data => {
      peer.signal(JSON.stringify(data))
    })

    peer.on('error', err => console.error(err))

    peer.on('connect', () => console.log('connected'))

    peer.on('close', () => console.log('closed'))

    peer.on('stream', stream => {
      const $video = document.createElement('video')
      $video.src = window.URL.createObjectURL(stream)
      document.body.appendChild($video)
      $video.play()
    })
  })
