import React from "react";
import { withRouter } from "react-router-dom";

class loginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
      }

      update(field) {
        return e =>
          this.setState({
            [field]: e.currentTarget.value
          });
      }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
  
        let that = this;
        this.props.loginUser(user)
        .then( function(){
          if(that.props.auth) {
            that.props.closeModal();
          }
        });
      }

    render() {
        return (
          <div className='whole-login-container'>

            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="login-form">

                  <h1 className="login-title">Please {this.props.formType}</h1>
                  <div>
                    <input
                      type="text"
                      value={this.state.username}
                      onChange={this.update("username")}
                      className="login-input"
                      placeholder="Username"
                      />
                  </div>
                <br />
                  <div>
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.update("password")}
                      className="login-input"
                      placeholder="Password"
                      />
                  </div>
                <br />

                <input
                  className="session-submit"
                  type="submit"
                  value={this.props.formType}
                />
              </div>
            </form>

            <button
              className="session-submit demo-login">
              Demo Login
            </button>

            <a className="google-login" href="/auth/google">
                <i className="fab fa-google-plus-g"></i>
                <p>Sign in with Google+</p>
            </a>

            <div className="form-nav">
              {this.props.otherForm}
            </div>

            </div>
        );
    }

}

export default withRouter(loginForm);
