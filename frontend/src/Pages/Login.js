import React from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';

import './Login.css';

export default class Login extends React.Component {
  doLogin() {
    alert('do some ajax stuff here');
  }

  render() {
    return (
      <div className="loginScreen">
        <Container>
          <h1 className="title">Log in</h1>
          <Row>
            <Col></Col>
            <Col>
              <div className="pageContainer">
                <fieldset className="inputContainer">
                  <Input type="email" name="email" id="emailInput" className="formControl" placeholder="Email Address" />
                  <Input type="password" name="password" id="passwordInput" className="formControl" placeholder="Password" />
                  <Button color="primary" size="lg" block onClick={this.doLogin}>Log in</Button>
                </fieldset>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}