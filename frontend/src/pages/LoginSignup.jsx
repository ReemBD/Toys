import { userService } from '../services/userService.js'
import { Component, Fragment } from 'react'
import { setUser } from '../store/actions/userActions.js'
import { connect } from 'react-redux'
import { Title } from '../cmps/Title.jsx'
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core';


class _LoginSignup extends Component {
  state = {
    msg: '',
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    }
  }

  componentDidMount() {
    const user = userService.getLoggedinUser()
    if (user) this.props.setUser(user)

  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    console.log('hello');
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    try {
      const user = await userService.login(userCreds)
      console.log('from login: ', user);
      const { setUser } = this.props
      await setUser(user)
      this.props.history.push('/')
    }
    catch (err) {
      this.setState({ msg: 'Try again' })
    }
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }

    const user = await userService.signup({ username, password, fullname })
    await this.props.setUserz
    this.props.history.push('/')
  }

  doLogout = async () => {
    await userService.logout()
    const { setUser } = this.props
    setUser(null)

  }

  render() {

    const { loggedinUser } = this.props
    let signupSection = (
      <form className="signup-form" onSubmit={this.doSignup}>
        <h2 className="signup-title">Doesn't have an account yet?</h2>
        <TextField
          type="text"
          name="fullname"
          value={this.state.signupCred.fullname}
          onChange={this.signupHandleChange}
          placeholder="Full name"
        />
        <TextField
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
        />
        <TextField
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
        />
        <br />
        <Button type="submit" className="signup-btn" variant="contained">Signup</Button>
      </form>
    )
    let loginSection = (
      <form className="login-form" onSubmit={this.doLogin}>
        <TextField
          type="text"
          name="username"
          value={this.state.loginCred.username}
          id="outlined-required"
          label="Username"
          variant="outlined"
          className="username-input"
          onChange={this.loginHandleChange}
          placeholder="Required"
        />
        <br />
        <TextField
          type="password"
          name="password"
          id="outlined-required"
          label="Password"
          variant="outlined"
          className="password-input"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Required"
        />
        <br />
        <Button type="submit" color="primary" variant="contained">Login</Button>
      </form>
    )


    return (
      <Fragment>
        <div className="title flex space-between">
          <h1>{loggedinUser ? `Welcome, ${loggedinUser.username}` : 'Login for full experience!'}</h1>
          {loggedinUser && (<Button color="primary" variant="contained" className="logout-btn" onClick={this.doLogout}>Logout</Button>)}
        </div>
        <div className="login-signup">
          <p>{this.state.msg}</p>
          {!loggedinUser && loginSection}
          {!loggedinUser && signupSection}


        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { loggedinUser } = state.user
  return {
    loggedinUser
  }
}

const mapDispatchToProps = {
  setUser
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)