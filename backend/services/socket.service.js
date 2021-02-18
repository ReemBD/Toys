

const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}
var gTypingUser = {
    username: '',
    at: Date.now()
}

function emit({ type, data }) {
    gIo.emit(type, data);
}


function connectSockets(http, session) {
    gIo = require("socket.io")(http, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        // console.log('socket.handshake', socket.handshake)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })
        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            // logger.debug('Session ID is', socket.handshake.sessionID)
            socket.myTopic = topic
        })
        socket.on('chat newMsg', msg => {
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            gIo.to(socket.myTopic).emit('chat addMsg', msg)
            socket.broadcast.to(socket.myTopic).emit('userTyping', { username: gTypingUser.username, msg: null })
        })
        socket.on('typing', ({ username, msg }) => {
            console.log('username, msg ', username, msg);
            console.log('time between ', gTypingUser.at + 2000 > Date.now());
            if (gTypingUser.at + 2000 > Date.now() && gTypingUser.username !== username) return
            gTypingUser.at = Date.now()
            gTypingUser.username = username
            socket.broadcast.to(socket.myTopic).emit('userTyping', { username, msg })
        })
    })
}



// Send to all sockets BUT not the current socket 
function broadcast({ type, data }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap)
    excludedSocket.broadcast.emit(type, data)
}

module.exports = {
    connectSockets,
    emit,
    broadcast
}



