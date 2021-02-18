import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService'
import { Title } from '../cmps/Title.jsx'

class _Chat extends Component {
  state = {
    msg: { txt: '' },
    msgs: socketService.getMsgsFromStorage() || [],
    topic: this.props.toy._id,
    isBotMode: true,
    currTypingUser: {
      username: '',
      isTyping: false
    }
  }

  componentDidMount() {
    socketService.setup()
    socketService.emit('chat topic', this.state.topic)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('userTyping', ({ username, msg }) => {
      this.setState({ currTypingUser: { username, isTyping: msg ? true : false } }, () => {
        console.log('currTypingUser: ', this.state.currTypingUser);
      })
    }
    )
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.toy._id !== this.props.toy._id) {
      this.setState({ topic: this.props.toy._id, msgs: [] }, async () => {
        await socketService.emit('chat topic', this.state.topic)
      })
    }
  }

  componentWillUnmount() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate()
    clearTimeout(this.timeout)
  }

  addMsg = newMsg => {
    this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }), () => {
      socketService.saveMsgsToStorage(this.state.msgs)
    })
    if (this.state.isBotMode) this.sendBotResponse();
  }

  sendBotResponse = () => {
    // Handle case: send single bot response (debounce).
    this.timeout && clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState(prevState => ({ msgs: [...prevState.msgs, { from: 'Bot', txt: 'You are amazing!' }] }), () => {
        socketService.saveMsgsToStorage(this.state.msgs)
      })
    }, 1500)
  }

  changeTopic = () => {
    socketService.emit('chat topic', this.state.topic)
  }

  sendMsg = ev => {
    ev.preventDefault()
    const from = this.props.loggedinUser?.fullname || this.props.loggedinUser?.username || 'Me'
    socketService.emit('chat newMsg', { from, txt: this.state.msg.txt })
    this.setState({ msg: { from: 'Me', txt: '' } })
  }

  handleChange = ev => {
    const { name, value } = ev.target
    this.setState({ [name]: value }, this.changeTopic)
  }

  msgHandleChange = async ev => {
    const { name, value } = ev.target
    const user = {
      username: this.props.loggedinUser?.fullname || this.props.loggedinUser?.username || 'guest',
      msg: value
    }
    socketService.emit('typing', user)

    this.setState(prevState => {
      return {
        msg: {
          ...prevState.msg,
          [name]: value
        }
      }
    })
  }

  render() {
    const { currTypingUser, msg } = this.state
    const { isOpen } = this.props
    return (
      <div className={`chat ${isOpen && 'active'}`}>
        <h2 className="chat-topic chat-layout flex space-between">Chat about this toy!<i class="fas fa-times" onClick={this.props.onClose}></i></h2>
        <label>
          <input
            type="checkbox"
            name="isBotMode"
            checked={this.state.isBotMode}
            onChange={(ev) => this.setState({ isBotMode: ev.target.checked })}
            className="chat-layout"
          />
          Bot Mode
        </label>
        <h3>{currTypingUser?.isTyping && currTypingUser.username + 'is typing...'}</h3>

        <div className="chat-main-content">
          <ul className="chat-msgs chat-layout">
            {this.state.msgs.map((msg, idx) => (
              <li key={idx}><span className="from">{msg.from}:</span>{msg.txt}</li>
            ))}
          </ul>
          <form class="msg-form" onSubmit={this.sendMsg}>
            <input
              type="text"
              value={msg.txt}
              onChange={this.msgHandleChange}
              name="txt"
              className="msg-input"
              autoComplete="off" />
            <button>Send</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedinUser: state.user.loggedinUser
  }
}
const mapDispatchToProps = {
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)
