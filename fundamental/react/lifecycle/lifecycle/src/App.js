import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// This component illustrates a getDerivedStateFromProps anti-pattern.
// Don't copy this approach!
// 反模式：Unconditionally copying props to state 无条件地把 props 复制到 state 中
class Email extends Component {
  state = {
    email: this.props.email
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.email} />
      </div>
    )
  }

  handleChange = event => {
    this.setState({
      email: event.target.value
    })
  }

  // 
  componentDidUpdate() {

  }

  // 即使 props.email 没有变化
  // componentWillReceiveProps 在组件每次 render 的时候，都会重新运行
  // 因此，避免用如下的方式变更 state  
  componentWillReceiveProps(nextProps) {
    // STEP 0:
    // This will erase any local state updates!
    // Do not do this.
    // this.setState({
    //   email: nextProps.email
    // })

    // STEP 1:
    // Improvement 1: 
    if (nextProps.email !== this.state.email) {
      this.setState({
        email: nextProps.email
      })
    }
  }
}

class App extends Component {
  state = {
    foo: "xx",
    email: 'test@test'
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Email email={this.state.email} ></Email>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React {this.state.foo}
          </a>

          <button onClick={this.changeFooState}>改变父组件 foo 状态</button>
          <button onClick={this.changeEmailState}>改变父组件 email 状态</button>

        </header>
      </div>
    );
  }

  changeFooState = () => {
    this.setState({ foo: this.state.foo + 1 })
  }
  changeEmailState = () => {
    this.setState({ email: this.state.email + 1 })
  }


}

export default App;
