import io from 'socket.io-client'

import { storageService } from '../services/storageService.js'
const baseUrl = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:3030'
export const socketService = createSocketService()

// export const socketService = createDummySocketService()

window.socketService = socketService
const MSG_STORAGE_KEY = 'msgDB'

function createSocketService() {
    var socket;

    const socketService = {
        setup() {
            socket = io(baseUrl, {
                withCredentials: true,
                extraHeaders: {
                    "my-custom-header": "abcd"
                }
            });
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb) {
            socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        terminate() {
            socket = null
        },
        saveMsgsToStorage(msgs) {
            storageService.store(MSG_STORAGE_KEY, msgs)
        },
        getMsgsFromStorage() {
            return storageService.load(MSG_STORAGE_KEY)
        }
        

    }
    return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
    var listenersMap = {}
    const socketService = {
        setup() {
            listenersMap = {}
        },
        terminate() {
            this.setup()
        },
        on(eventName, cb) {
            listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
        },
        off(eventName, cb) {
            if (!listenersMap[eventName]) return
            listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
        },
        emit(eventName, data) {
            if (!listenersMap[eventName]) return
            listenersMap[eventName].forEach(listener => {
                listener(data)
            })
        },
        debugMsg() {
            this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
        },
    }
    return socketService
}

function saveMsgsToStorage(msgs) {
    storageService.store(MSG_STORAGE_KEY, msgs)
}

function getMsgsFromStorage() {
    return storageService.load(MSG_STORAGE_KEY)
}

// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)
