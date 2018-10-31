import React from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';

import './Login.css';

export default class Login extends React.Component {
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
                  <Button color="primary" size="lg" block>Log in</Button>
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