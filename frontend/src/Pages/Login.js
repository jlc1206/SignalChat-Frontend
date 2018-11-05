import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Input, Button } from 'reactstrap';

import { doLogin } from '../redux/actions';

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="loginScreen">
        <Container>
          <h1 className="title">Log in</h1>
          <Row>
            <Col xl></Col>
            <Col xl>
              <div className="pageContainer">
                <fieldset className="inputContainer">
                  <Input type="email" name="email" id="emailInput" className="formControl" placeholder="Email Address" onChange={(evt) => this.setState({username: evt.target.value})} />
                  <Input type="password" name="password" id="passwordInput" className="formControl" placeholder="Password" onChange={(evt) => this.setState({password: evt.target.value})} />
                  <Button color="primary" size="lg" block onClick={() => this.props.onLoginClick(this.state.username, this.state.password)}>Log in</Button>
                </fieldset>
              </div>
            </Col>
            <Col xl></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (username, pass) => {
      doLogin(dispatch, username, pass);
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
